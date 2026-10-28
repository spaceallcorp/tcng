import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ProductService } from '../../services/product.service';
import { Produto } from '../../models/products.model';
import { MenuComponent } from '../menu/menu.component';
import { RodapeComponent } from '../rodape/rodape.component';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenuComponent,
    RodapeComponent
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private routeSub!: Subscription;
  private titleService = inject(Title);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);

  productName: string = '';

  // Gatilho para disparar recarregamentos manuais
  private reloadTrigger$ = new BehaviorSubject<void>(undefined);

  product: Produto | null = null;
  tooltipText = '';
  tooltipX = 0;
  tooltipY = 0;
  relatedProducts: Produto[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.productName = data['productName'] || '';
      if (this.productName) {
        this.titleService.setTitle(`${this.productName} - TelCables Nigeria`);
      } else {
        this.titleService.setTitle('Product Details - TelCables Nigeria');
      }
      this.cdr.detectChanges();
    });

    // Combinamos as mudanças da rota com o gatilho de recarregamento manual
    this.routeSub = combineLatest([
      this.route.paramMap,
      this.reloadTrigger$
    ]).pipe(
      switchMap(([params, _]) => {
        this.isLoading = true;
        this.errorMessage = '';
        this.cdr.detectChanges();
        const id = params.get('id');

        if (!id) {
          throw new Error('Produto não encontrado');
        }

        return this.productService.getProducts().pipe(
          switchMap(products => [{ products, id }])
        );
      })
    ).subscribe({
      next: ({ products, id }) => {
        this.ngZone.run(() => {
          this.product = products.find(p => String(p.id) === id) || null;

          if (!this.product) {
            this.errorMessage = 'Produto não encontrado';
            this.isLoading = false;
            this.cdr.detectChanges();
            return;
          }

          if (this.product.name) {
            this.titleService.setTitle(`${this.product.name} - TelCables Nigeria`);
          }

          // Carrega produtos relacionados
          this.relatedProducts = products
            .filter(p =>
              String(p.id) !== String(this.product?.id) &&
              (p.productCategory === this.product?.productCategory ||
                p.productSector === this.product?.productSector)
            )
            .slice(0, 4);

          this.isLoading = false;
          this.cdr.detectChanges();
          this.scrollToContent();
        });
      },
      error: (error) => {
        this.ngZone.run(() => {
          console.error('Error loading product:', error);
          this.errorMessage = error.message || 'Erro ao carregar produto. Por favor, tente novamente.';
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  loadProduct(): void {
    this.reloadTrigger$.next();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  formatBigNumber(value?: string, title?: string): string {
    if (!value) {
      return 'N/A';
    }

    const titleLower = title?.toLowerCase() || '';

    if ((titleLower.includes('percent') || titleLower.includes('%') || titleLower.includes('taxa') || titleLower.includes('uptime')) && !value.includes('%')) {
      return `${value}%`;
    }

    return value;
  }

  getBigNumberIcon(title: string, index: number): string {
    const iconMap: { [key: string]: string } = {
      'clientes': '👥',
      'usuários': '👤',
      'vendas': '💰',
      'receita': '💵',
      'uptime': '⏱️',
      'disponibilidade': '🟢',
      'performance': '⚡',
      'escalabilidade': '📊'
    };

    const titleLower = title.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
      if (titleLower.includes(key)) return icon;
    }

    const defaultIcons = ['📈', '🚀', '🌍', '⚡', '🎯', '💎', '🔧', '⭐'];
    return defaultIcons[index % defaultIcons.length];
  }

  getBigNumberTrend(title: string, value: number): string {
    if (value > 10000) return '🚀 Crescimento excepcional';
    if (value > 5000) return '📈 Crescimento acelerado';
    if (value > 1000) return '✅ Excelente desempenho';
    if (value > 500) return '👍 Bom progresso';
    if (value > 100) return '📊 Resultado positivo';
    return '💪 Em desenvolvimento';
  }

  getShortDescription(description?: string): string {
    if (!description) return '';
    return description.length > 180 ? description.substring(0, 180) + '...' : description;
  }

  scrollToContent(): void {
    const element = document.querySelector('.product-detail-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  showTooltip(event: MouseEvent, text: string): void {
    this.tooltipText = text;
    this.tooltipX = event.clientX + 15;
    this.tooltipY = event.clientY + 15;

    setTimeout(() => {
      if (this.tooltipText === text) this.hideTooltip();
    }, 2000);
  }

  hideTooltip(): void {
    this.tooltipText = '';
  }

  navigateToProduct(id: string | number): void {
    this.router.navigate(['/product', id]);
  }

  trackByProductId(index: number, item: Produto): string | number {
    return item.id;
  }

  handleImageError(event: any): void {
    event.target.src = '/img/logo-tcng.png';
  }

  openContactForm(): void {
    this.router.navigate(['/contact']);
  }

  shareOnFacebook(): void {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.product?.name || 'Produto');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&title=${title}`, '_blank');
  }

  shareOnTwitter(): void {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Confira ${this.product?.name} - ${this.product?.description?.substring(0, 100)}`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  }

  shareOnLinkedIn(): void {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.product?.name || 'Produto');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank');
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.showTooltipMessage('Link copiado com sucesso!');
    }).catch(() => {
      this.showTooltipMessage('Erro ao copiar link');
    });
  }

  private showTooltipMessage(message: string): void {
    const tempTooltip = document.createElement('div');
    tempTooltip.textContent = message;
    tempTooltip.style.position = 'fixed';
    tempTooltip.style.bottom = '20px';
    tempTooltip.style.right = '20px';
    tempTooltip.style.backgroundColor = '#1AB8DD';
    tempTooltip.style.color = '#002561';
    tempTooltip.style.padding = '12px 24px';
    tempTooltip.style.borderRadius = '12px';
    tempTooltip.style.zIndex = '10000';
    tempTooltip.style.fontWeight = 'bold';
    tempTooltip.style.boxShadow = '0 4px 12px rgba(0, 37, 97, 0.3)';
    document.body.appendChild(tempTooltip);

    setTimeout(() => tempTooltip.remove(), 2000);
  }
}

