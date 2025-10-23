import { Home, Package, Map, Layers, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from './ThemeProvider';

type Page = 'home' | 'addon' | 'map' | 'mcui';

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ currentPage, onPageChange, isOpen }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  
  const menuItems = [
    { id: 'home' as Page, label: 'Home', icon: Home },
    { id: 'addon' as Page, label: 'Addon', icon: Package },
    { id: 'map' as Page, label: 'Map', icon: Map },
    { id: 'mcui' as Page, label: 'McUi', icon: Layers },
  ];

  return (
    <aside 
      className={`
        bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col
        transition-all duration-300 ease-in-out
        fixed left-0 top-0 h-full z-40
        ${isOpen ? 'w-64 px-4 py-4' : 'w-0'}
        overflow-hidden
      `}
    >
      <div className="mb-8 mt-12 opacity-100 transition-opacity duration-300">
        <h1 className="text-gray-800 dark:text-gray-100 whitespace-nowrap">SamSoSleepy</h1>
      </div>
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <Button
              key={item.id}
              variant={isActive ? 'default' : 'ghost'}
              className="w-full justify-start whitespace-nowrap transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => onPageChange(item.id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="outline"
          className="w-full justify-start whitespace-nowrap transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            <>
              <Sun className="mr-2 h-4 w-4" />
              Light Mode
            </>
          ) : (
            <>
              <Moon className="mr-2 h-4 w-4" />
              Dark Mode
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
