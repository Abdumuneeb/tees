import Panel from '@/components/ui/Panel';
import Link from 'next/link';

export default function CategoriesPanel() {
  const categories = [
    {
      title: 'T-SHIRTS',
      slug: 't-shirts',
      children: [
        {
          title: 'Short Sleeve T-Shirts',
          slug: 'short-sleeve-t-shirts',
        },
        {
          title: 'Long Sleeve T-Shirts',
          slug: 'long-sleeve-t-shirts',
        },
        {
          title: 'Soft & Fitted T-Shirts',
          slug: 'soft-and-fitted-t-shirts',
        },
        {
          title: 'Performance Shirts',
          slug: 'performance-shirts',
        },
        {
          title: 'Tank Tops & Sleeveless',
          slug: 'tank-tops-and-sleeveless',
        },
        {
          title: "Women's T-Shirts",
          slug: 'womens-t-shirts',
        },
        {
          title: 'Kids T-Shirts',
          slug: 'kids-t-shirts',
        },
        {
          title: 'V-Neck T-Shirts',
          slug: 'v-neck-t-shirts',
        },
        {
          title: 'Pocket T-Shirts',
          slug: 'pocket-t-shirts',
        },
        {
          title: 'Ringer Tees',
          slug: 'ringer-tees',
        },
        {
          title: 'Baseball Tees',
          slug: 'baseball-tees',
        },
        {
          title: 'CHAMPIONSHIP SHIRT_S 2022',
          slug: 'championship-shirts-2022',
        },
      ],
    },
    {
      title: 'Sweatshirts & Hoodies',
      slug: 'sweatshirts-and-hoodies',
      children: [
        {
          title: 'Hoodies',
          slug: 'hoodies',
        },
        {
          title: 'Crew Neck',
          slug: 'crew-neck',
        },
        {
          title: 'Zip Up Hoodies',
          slug: 'zip-up-hoodies',
        },
        {
          title: 'Quarter Zip Pullovers-',
          slug: 'quarter-zip-pullovers-',
        },
        {
          title: "Women's Sweatshirts",
          slug: 'women-sweatshirts',
        },
        {
          title: "Kids' Hoodies",
          slug: 'kids-hoodies',
        },
        {
          title: 'Hoodies+crews',
          slug: 'hoodiescrews',
        },
        {
          title: 'Half Zips',
          slug: 'half-zips',
        },
        {
          title: 'Full zip Hoodies',
          slug: 'full-zip-hoodies',
        },
        {
          title: '1/4 zip sweat shirt',
          slug: '14-zip-sweat-shirt',
        },
      ],
    },
    {
      title: "Women's",
      slug: "women's",
      children: [
        {
          title: "Women's T-Shirts",
          slug: 'womens-t-shirts-',
        },
        {
          title: "Women's Sweatshirts",
          slug: 'womens-sweatshirts',
        },
        {
          title: "Women's Polo Shirts",
          slug: 'Womens-polo-shirts',
        },
        {
          title: "Women's Tank Tops",
          slug: 'womens-tank-tops',
        },
        {
          title: "Women's Activewear",
          slug: 'womens-activewear',
        },
        {
          title: "Women's Jackets",
          slug: 'womens-jackets',
        },
      ],
    },
    {
      title: 'POLO SHIRTS',
      slug: 'polo-shirts',
      children: [
        {
          title: 'Embroidered Polos',
          slug: 'embroidered-polos',
        },
        {
          title: 'Long Sleeve Polos',
          slug: 'long-sleeve-polos',
        },
        {
          title: 'Performance Polos',
          slug: 'performance-polos',
        },
      ],
    },
    {
      title: 'HATS',
      slug: 'hats',
      children: [
        {
          title: 'Baseball Caps',
          slug: 'baseball-caps',
        },
        {
          title: 'Trucker Hats',
          slug: 'trucker-hats',
        },
        {
          title: 'Dad Hats',
          slug: 'dad-hats',
        },
        {
          title: 'Fitted Hats',
          slug: 'fitted-hats',
        },
        {
          title: 'Premium Hats',
          slug: 'premium-hats',
        },
        {
          title: 'Embroidered Hats',
          slug: 'embroidered-hats',
        },
        {
          title: 'Beanies',
          slug: 'beanies',
        },
      ],
    },
    {
      title: 'Brands',
      slug: 'brands',
      children: [
        {
          title: 'Adidas',
          slug: 'adidas',
        },
        {
          title: 'American Apparel',
          slug: 'american-apparel',
        },
        {
          title: 'Champion',
          slug: 'champion',
        },
        {
          title: 'Carhartt',
          slug: 'carhartt',
        },
        {
          title: 'Comfort Colors',
          slug: 'comfort-colors',
        },
        {
          title: 'Eddie Bauer',
          slug: 'eddie-bauer',
        },
        {
          title: 'Gildan',
          slug: 'gildan',
        },
        {
          title: 'Nike',
          slug: 'nike',
        },
        {
          title: 'Under Armour',
          slug: 'under-armour',
        },
      ],
    },
    {
      title: 'JACKETS',
      slug: 'jackets',
      children: [
        {
          title: 'Fleece Jackets',
          slug: 'fleece-jackets',
        },
        {
          title: 'Quarter Zip Pullovers',
          slug: 'quarter-zip-pullovers',
        },
        {
          title: 'Vests',
          slug: 'vests',
        },
        {
          title: 'Soft Shell Jackets',
          slug: 'soft-shell-jackets',
        },
      ],
    },
    {
      title: 'Pants',
      slug: 'pants',
      children: [
        {
          title: 'Sweatpants',
          slug: 'sweatpants',
        },
        {
          title: 'Accessories',
          slug: 'accessories',
        },
        {
          title: 'Flannel Pants',
          slug: 'flannel-pants',
        },
        {
          title: 'Joggers',
          slug: 'joggers',
        },
      ],
    },
  ];

  return (
    <div className='lg:w-80'>
      {categories.map(category => (
        <Panel key={category.slug} label={category.slug} initialOpen={false} className='mb-2 border-b'>
          <div className='px-1 pb-2'>
            {category.children.map(subCategory => (
              <Link
                href={`/categories/${category.slug}/${subCategory.slug}`}
                key={subCategory.slug}
                className='block hover:text-primary'
              >
                {subCategory.title}
              </Link>
            ))}
          </div>
        </Panel>
      ))}
    </div>
  );
}
