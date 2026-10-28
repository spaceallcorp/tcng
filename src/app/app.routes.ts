import { Routes } from '@angular/router';
import { productResolver } from './resolvers/product-resolver';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { DatacenterComponent } from './paginas/datacenter/datacenter.component';
import { AcercaComponent } from './paginas/acerca/acerca.component';
import { EventosComponent } from './layout/eventos/eventos.component';
import { EventosAcComponent } from './paginas/eventos-ac/eventos-ac.component';
import { BlogComponent } from './paginas/blog/blog.component';
import { ConectividadeComponent } from './paginas/conectividade/conectividade.component';
import { CloudservicesComponent } from './paginas/cloudservices/cloudservices.component';
import { DatacentersevicesComponent } from './paginas/datacentersevices/datacentersevices.component';
import { SegurancaComponent } from './paginas/seguranca/seguranca.component';
import { NoticiasComponent } from './paginas/noticias/noticias.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';

import { ServiceFormComponent } from './layout/service-form/service-form.component';
import { PrivacypolicyComponent } from './paginas/privacypolicy/privacypolicy.component';
import { TermsandconditionsComponent } from './paginas/termsandconditions/termsandconditions.component';


export const routes: Routes = [
  { 
    path: '', 
    component: InicioComponent, 
    title: 'TelCables Nigeria | Global Connectivity, Cloud & Data Center Solutions' 
  },
  { 
    path: 'inicio', 
    component: InicioComponent, 
    title: 'Home | TelCables Nigeria' 
  },
  { 
    path: 'company', 
    component: AcercaComponent, 
    title: 'About Us - Who We Are | TelCables Nigeria' 
  },

  { 
    path: 'datacenter', 
    component: DatacenterComponent, 
    title: 'Data Center & Colocation Facilities | TelCables Nigeria' 
  },
  { 
    path: 'eventos', 
    component: EventosAcComponent, 
    title: 'Events & Conferences | TelCables Nigeria' 
  },
  { 
    path: 'solutions', 
    component: BlogComponent, 
    title: 'Enterprise Solutions & Industry Insights | TelCables Nigeria' 
  },
  { 
    path: 'connectivity', 
    component: ConectividadeComponent, 
    title: 'Global Connectivity, IP Transit & Metro Connect | TelCables Nigeria' 
  },
  { 
    path: 'cloud', 
    component: CloudservicesComponent, 
    title: 'Cloud Services, IaaS & Cloud Storage | TelCables Nigeria' 
  },
  { 
    path: 'data-center', 
    component: DatacentersevicesComponent, 
    title: 'Data Center Services & Interconnectivity | TelCables Nigeria' 
  },
  { 
    path: 'security', 
    component: SegurancaComponent, 
    title: 'Cybersecurity & DDoS Protection Solutions | TelCables Nigeria' 
  },
  { 
    path: 'contact', 
    component: ContactoComponent, 
    title: 'Contact Us | TelCables Nigeria' 
  },

  { 
    path: 'service-contact', 
    component: ServiceFormComponent, 
    title: 'Request a Service & Consultation | TelCables Nigeria' 
  },

  { 
    path: 'privacypolicy', 
    component: PrivacypolicyComponent, 
    title: 'Privacy Policy | TelCables Nigeria' 
  },
  { 
    path: 'termsandconditions', 
    component: TermsandconditionsComponent, 
    title: 'Terms and Conditions | TelCables Nigeria' 
  },

  {
    path: 'solution',
    loadComponent: () => import('./layout/artigo-lista/artigo-lista.component').then(m => m.ArtigoListaComponent),
    title: 'Solutions & Case Studies | TelCables Nigeria'
  },

  {
    path: 'product/:id',
    loadComponent: () => import('./layout/product-detail/product-detail.component').then(m => m.ProductDetailComponent),
    resolve: {
      productName: productResolver
    },
    title: 'Products & Services | TelCables Nigeria'
  },

  {
    path: 'cookies-policy',
    loadComponent: () => import('./paginas/policy-cookies/policy-cookies.component').then(m => m.PolicyCookiesComponent),
    title: 'Cookie Policy | TelCables Nigeria'
  },

  {
    path: 'news',
    loadComponent: () => import('./paginas/noticias/noticias.component').then(m => m.NoticiasComponent),
    title: 'Latest News & Media | TelCables Nigeria'
  },
  {
    path: 'solution/:id',
    loadComponent: () => import('./layout/artigo/artigo.component').then(m => m.ArtigoComponent),
    title: 'Solution Details | TelCables Nigeria'
  },
];
