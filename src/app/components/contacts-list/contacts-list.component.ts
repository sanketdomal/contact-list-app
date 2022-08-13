import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts: any;
  currentIndex = -1;
  name = '';
  nameAll = '';
  clicked = false; 

  page = 1;
  count = 0;
  pageSize = 6;
  pageSizes = [3, 6, 9];

  constructor(private contactService: ContactService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.retrieveContacts();
  }

  getRequestParams(page, pageSize) {
    // tslint:disable-next-line:prefer-const
    let params = {};



    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveContacts() {
    const params = this.getRequestParams(this.page, this.pageSize);

    this.contactService.getPaginatedContacts(params)
      .subscribe(
        response => {
          const { content, totalElements } = response;
          this.contacts = content;
          this.count = totalElements;

          this.clicked = this.contacts.length === 0 ? false : true;
        },
        error => {
          console.log(error);
        });
  }


  //Search withing paginated data with specified name
  searchContactByName() {
    if (this.name.length === 0) {
      this.retrieveContacts();
    }
    const filteredContacts = this.contacts.filter((obj) => {
      return obj.name.toLowerCase().includes(this.name.trim().toLowerCase());
    });
    this.contacts = filteredContacts;
  }

  //This function is for search in entire Records
  retriveAllContactsWihoutPaginationAndSearchForContact() {
    this.contactService.getAllContacts()
      .subscribe(
        response => {
          const filteredContacts = response.filter((obj) => {
            return obj.name.toLowerCase().includes(this.nameAll.trim().toLowerCase());
          });
          this.contacts = filteredContacts;
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event) {
    this.page = event;
    this.retrieveContacts();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveContacts();
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  populateData(){
    this.clicked = true;
    this.contactService.populateInMemoryData().subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }
}
