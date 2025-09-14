import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { DomHandlerService } from '@services/dom-handler.service';
import { ConfirmDialogComponent } from '@shared-components/confirm-dialog/confirm-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-support',
    imports: [
        FlexLayoutModule,
        MatCardModule,
        MatDividerModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        NgxPaginationModule,
        PipesModule,
        DatePipe
    ],
    templateUrl: './support.component.html'
})
export class SupportComponent {
  public tickets = [
    { id: 1, statusId: 1, code: '#000625', supportCategoryId: 1, issue: 'lorem ipsum', order: '#1556', customer: 'Andy Warhol', storeId: 1, date: new Date(2020, 1, 15, 10, 45) },
    { id: 2, statusId: 2, code: '#002350', supportCategoryId: 2, issue: 'lorem ipsum', order: '#5214', customer: 'Luisa Styles', storeId: 2, date: new Date(2020, 2, 8, 22, 12) },
    { id: 3, statusId: 3, code: '#007852', supportCategoryId: 3, issue: 'lorem ipsum', order: '#4285', customer: 'Michael Blair', storeId: 2, date: new Date(2020, 3, 29, 14, 30) },
    { id: 4, statusId: 4, code: '#009621', supportCategoryId: 4, issue: 'lorem ipsum', order: '#3658', customer: 'Julia Aniston', storeId: 1, date: new Date(2020, 4, 18, 8, 20) }
  ];
  public statuses = [
    { id: 1, name: 'In Progress' },
    { id: 2, name: 'Pending' },
    { id: 3, name: 'Solved' },
    { id: 4, name: 'Closed' }
  ];
  public spportCategories = [
    { id: 1, name: 'Pre-Sale Question' },
    { id: 2, name: 'Order Question' },
    { id: 3, name: 'Shipping' },
    { id: 4, name: 'Product Availability' }
  ];
  public stores = [
    { id: 1, name: 'Store 1' },
    { id: 2, name: 'Store 2' }
  ];
  public page: any;
  public count = 6;
  domHandlerService = inject(DomHandlerService);

  constructor(public dialog: MatDialog) { } 

  public onPageChanged(event: any) {
    this.page = event;
    this.domHandlerService.winScroll(0, 0);
  }

  public remove(ticket: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want remove this ticket?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const index: number = this.tickets.indexOf(ticket);
        if (index !== -1) {
          this.tickets.splice(index, 1);
        }
      }
    });
  }

}
