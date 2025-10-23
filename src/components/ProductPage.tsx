import { useState, useMemo } from 'react';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { AddonCard } from './AddonCard';
import { MapCard } from './MapCard';
import { McUiCard } from './McUiCard';

interface Product {
  id: string;
  title: string;
  info: string;
  image: string;
  downloadLink: string;
}

interface ProductPageProps {
  type: 'addon' | 'map' | 'mcui';
}

const sampleProducts: Record<string, Product[]> = {
  addon: [
    {
      id: '1',
      title: '(New) Big Name',
      info: 'info',
      image: 'https://media.tenor.com/1zTY4DgpDK8AAAAM/undertale-sans.gif',
      downloadLink: 'https://gofile.io/d/0gy57P',
    },
    {
      id: '2',
      title: 'Sample Addon Pack',
      info: 'This is a sample addon pack that includes various features for your game.',
      image: 'https://media.tenor.com/1zTY4DgpDK8AAAAM/undertale-sans.gif',
      downloadLink: '',
    },
    {
      id: '3',
      title: '(Hot) Premium Addon',
      info: 'A premium addon with advanced features.',
      image: 'https://media.tenor.com/1zTY4DgpDK8AAAAM/undertale-sans.gif',
      downloadLink: 'https://example.com/premium',
    },
    {
      id: '4',
      title: '(Most Download) Premium Addon',
      info: 'A premium addon with advanced features.',
      image: 'https://media.tenor.com/1zTY4DgpDK8AAAAM/undertale-sans.gif',
      downloadLink: 'https://example.com/premium',
    },
  ],


  
  map: [
    {
      id: '4',
      title: '(New) Adventure Map',
      info: 'An exciting adventure map with challenging quests.',
      image: 'https://media.tenor.com/1zTY4DgpDK8AAAAM/undertale-sans.gif',
      downloadLink: 'https://example.com/map1',
    },
    {
      id: '5',
      title: 'City Builder Map',
      info: 'Create your dream city in this expansive map.',
      image: 'https://media.tenor.com/1zTY4DgpDK8AAAAM/undertale-sans.gif',
      downloadLink: 'https://example.com/map2',
    },
  ],


  
  mcui: [
    {
      id: '6',
      title: '(Popular) Modern UI Pack',
      info: 'A sleek and modern UI pack for Minecraft.',
      image: 'https://media.tenor.com/1zTY4DgpDK8AAAAM/undertale-sans.gif',
      downloadLink: 'https://example.com/ui1',
    },
    {
      id: '7',
      title: 'Minimalist Interface',
      info: 'Clean and minimalist UI for better gameplay experience.',
      image: 'https://media.tenor.com/1zTY4DgpDK8AAAAM/undertale-sans.gif',
      downloadLink: 'https://example.com/ui2',
    },
  ],
};

export function ProductPage({ type }: ProductPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const products = sampleProducts[type] || [];

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const pageTitle = type.charAt(0).toUpperCase() + type.slice(1);

  const renderCard = (product: Product) => {
    switch (type) {
      case 'addon':
        return <AddonCard key={product.id} product={product} />;
      case 'map':
        return <MapCard key={product.id} product={product} />;
      case 'mcui':
        return <McUiCard key={product.id} product={product} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-6 text-gray-900 dark:text-gray-100">{pageTitle}</h1>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <Input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => renderCard(product))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-12">
          No products found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
}
