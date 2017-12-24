import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

    private pageTitle: string = 'Product List';
    private imageWidth: number = 50;
    private imageMargin: number = 2;
    private showImage: boolean = false;
    private products: IProduct[];
    private errorMessage: string;

    _listFilter: string = '';

    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];

    constructor(private _productService: ProductService) {
    }

    ngOnInit(): void {
        this._productService.getProducts().subscribe(
            products => {
                this.products = products
                this.filteredProducts = this.products;
            },
            error => this.errorMessage = <any>error
        );
    }

    private performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    };

    private toogleImage(): void {
        this.showImage = !this.showImage;
    }
}