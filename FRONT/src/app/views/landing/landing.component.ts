import { Component, HostBinding } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';

interface FAQ {
  question: string;
  answer: string;
}
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  products: Product[] = [];
  faqs: FAQ[] = [
    {
      question: '¿Cómo puedo restablecer mi contraseña?',
      answer:
        'Para restablecer tu contraseña, ve a la página de inicio de sesión y haz clic en "¿Olvidaste tu contraseña?". Se te pedirá que ingreses tu dirección de correo electrónico asociada con tu cuenta y luego recibirás un correo electrónico con instrucciones sobre cómo restablecer tu contraseña.',
    },
    {
      question: '¿Cómo puedo actualizar mi información de perfil?',
      answer:
        'Para actualizar tu información de perfil, inicia sesión en tu cuenta y ve a la sección de perfil. Desde allí, podrás editar tu nombre, dirección, número de teléfono y cualquier otra información relevante. Asegúrate de guardar los cambios una vez que hayas completado la actualización.',
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer:
        'Aceptamos varios métodos de pago, incluidas las principales tarjetas de crédito (Visa, Mastercard, American Express) y PayPal. Si tienes alguna pregunta sobre métodos de pago específicos, no dudes en contactarnos.',
    },
    {
      question: '¿Cuál es su política de devolución?',
      answer:
        'Nuestra política de devolución te permite devolver productos dentro de un plazo de 30 días a partir de la fecha de compra para obtener un reembolso completo. Los productos deben estar en su estado original y sin usar. Para obtener más información sobre cómo devolver un producto, consulta nuestra página de políticas de devolución.',
    },
    {
      question: '¿Cómo puedo ponerme en contacto con atención al cliente?',
      answer:
        'Puedes ponerte en contacto con nuestro equipo de atención al cliente de varias maneras. Puedes enviarnos un correo electrónico a support@example.com, llamarnos al número +123456789, o utilizar nuestro chat en vivo disponible en nuestro sitio web durante horas hábiles.',
    },
  ];
  expandedIndex: number | null = null;
  mapFrame: any;

  constructor(
    public productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getProducts();
    this.mapFrame = document.getElementById('mapFrame');
    this.mapFrame.src =
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d967.5016367182119!2d-75.74074962318691!3d-14.076790632541522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9110e324888ea7b5%3A0xc01c08279e743fd3!2sLa%20Frutita!5e0!3m2!1ses-419!2spe!4v1707432887115!5m2!1ses-419!2spe';
    this.generateToken();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((res: Product[]) => {
      this.products = res;
    });
  }

  handleToggleAccordion(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  selectedMap: string = 'Puente Blanco';

  showMap(url: string, mapName: string): void {
    if (this.mapFrame instanceof HTMLIFrameElement && this.mapFrame !== null) {
      this.mapFrame.src = url;
    }
    this.selectedMap = mapName;
  }

  generateToken() {
    const existingToken = localStorage.getItem('Token');

    if (!existingToken) {
      this.cartService.generateTempToken().subscribe(
        (res: any) => {
          const token = res.token;
          localStorage.setItem('Token', token);
        },
        (error: any) => {
          console.error('Error al generar el token temporal:', error);
        }
      );
    }
  }
}
