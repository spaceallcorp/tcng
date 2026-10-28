import { ResolveFn } from '@angular/router';

export const productResolver: ResolveFn<string> = (route) => {
  const id = route.paramMap.get('id') || '';

  // Converte o slug para nome legível
  return id
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

