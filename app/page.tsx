import About from '@/components/home/About';
import Categories from '@/components/home/Categories';
import Design from '@/components/home/Design';
import Features from '@/components/home/Features';
import Help from '@/components/home/Help';
import Hero from '@/components/home/Hero';
import Process from '@/components/home/Process';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Categories />
      <Design />
      <Process />
      <Help />
      <About />
    </>
  );
}
