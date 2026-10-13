import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasListarComponent } from './noticias-listar.component';

describe('NoticiasListarComponent', () => {
  let component: NoticiasListarComponent;
  let fixture: ComponentFixture<NoticiasListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiasListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiasListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should paginate six items per page and move to next/previous pages', () => {
    const noticias = Array.from({ length: 15 }, (_, index) => ({
      id: index + 1,
      title: `Noticia ${index + 1}`,
      content: 'Test',
      noticiaUrl: '#',
      author: 'Author',
      createdAt: { toDate: () => new Date() }
    }));

    component.allNoticias = noticias;
    component.currentPage = 0;

    expect(component.paginatedNoticias.length).toBe(6);
    expect(component.totalPages).toBe(3);

    component.nextPage();
    expect(component.currentPage).toBe(1);
    expect(component.paginatedNoticias[0].id).toBe(7);

    component.prevPage();
    expect(component.currentPage).toBe(0);
    expect(component.paginatedNoticias[0].id).toBe(1);
  });
});
