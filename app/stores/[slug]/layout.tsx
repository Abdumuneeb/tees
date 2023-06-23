import Hero from '@/components/store/Hero';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Hero />
      {children}
    </>
  );
}
