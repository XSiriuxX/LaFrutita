import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProductService } from './services/product.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './views/landing/landing.component';
import { CardComponent } from './components/card/card.component';
import { CardsComponent } from './components/cards/cards.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartpopupComponent } from './components/cartpopup/cartpopup.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductDetailComponent } from './views/product-detail/product-detail.component';
import { ProductsComponent } from './views/products/products.component';
import { DarkModeService } from './services/dark-mode.service';
import { CartComponent } from './views/cart/cart.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CartService } from './services/cart.service';
import { FiltersComponent } from './components/filters/filters.component';
import { ContactComponent } from './views/contact/contact.component';
import { TeamComponent } from './views/team/team.component';
import { AboutComponent } from './views/about/about.component';
import { MenuComponent } from './views/menu/menu.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { BackbuttonComponent } from './components/backbutton/backbutton.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    CardComponent,
    CardsComponent,
    NavbarComponent,
    CartpopupComponent,
    FooterComponent,
    ProductDetailComponent,
    ProductsComponent,
    CartComponent,
    CarouselComponent,
    FiltersComponent,
    ContactComponent,
    TeamComponent,
    AboutComponent,
    MenuComponent,
    NotfoundComponent,
    BackbuttonComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [ProductService, DarkModeService, CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
