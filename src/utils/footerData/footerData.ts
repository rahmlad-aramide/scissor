export interface FooterLink {
  label: string;
  to: string;
  hash?: boolean;
}

export const product: FooterLink[] = [
  { label: 'Link Management', to: '/dashboard/my-links' },
  { label: 'QR Codes', to: '/dashboard/qr-codes' },
  { label: 'Analytics', to: '/dashboard/analytics' },
  { label: 'Developer API', to: '/dashboard/developer' },
];

export const company: FooterLink[] = [
  { label: 'Pricing', to: '/#pricing', hash: true },
  { label: 'Contact', to: '/get-quote' },
];

export const legal: FooterLink[] = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms of Service', to: '/terms-of-service' },
];
