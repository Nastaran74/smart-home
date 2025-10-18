'use client'

import React, { useState } from 'react';
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  Star,
  Zap,
  Tag,
  Truck,
  HelpCircle,
  Clock,
  MapPin,
  Mail,
  Phone,
  MessageSquare, // برای بخش مشاوره
  ChevronLeft, // برای مشاهده بیشتر
} from 'lucide-react';

// --- Typescript Interfaces ---

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  rating: number;
  reviews: number;
}

interface Category {
  id: number;
  name: string;
  image: string; 
}

interface Feature {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  image: string;
}

// --- Mock Data (داده‌های نمونه) ---

const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'همزن برقی دو کاره هوشمند',
    image: 'https://placehold.co/400x400/0F9592/ffffff?text=Mixer',
    price: 3500000,
    oldPrice: 4200000,
    discountPercent: 17,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: 'آبمیوه‌گیری چهار فصل',
    image: 'https://placehold.co/400x400/4F46E5/ffffff?text=Juicer',
    price: 1850000,
    rating: 4.5,
    reviews: 89,
  },
  {
    id: 3,
    name: 'توستر نان دیجیتال',
    image: 'https://placehold.co/400x400/F59E0B/ffffff?text=Toaster',
    price: 5200000,
    oldPrice: 6500000,
    discountPercent: 20,
    rating: 4.9,
    reviews: 210,
  },
  {
    id: 4,
    name: 'کتری برقی پیرکس',
    image: 'https://placehold.co/400x400/D97706/ffffff?text=Kettle',
    price: 890000,
    rating: 4.7,
    reviews: 55,
  },
];

// داده‌های بخش Frame 05 - دسته‌بندی‌های بزرگ
const specialCategories: Category[] = [
  { id: 1, name: 'خردکن و غذاساز', image: 'https://placehold.co/270x270/45A389/ffffff?text=Food+Processor' },
  { id: 2, name: 'سرویس قابلمه', image: 'https://placehold.co/270x270/5B5B5B/ffffff?text=Pots' },
  { id: 3, name: 'چرخ گوشت و همزن', image: 'https://placehold.co/270x270/D66885/ffffff?text=Meat+Grinder' },
  { id: 4, name: 'قهوه‌ساز و چای‌ساز', image: 'https://placehold.co/270x270/45A389/ffffff?text=Coffee+Maker' },
];

// داده‌های بخش Frame 08 - بلاگ
const mockBlogPosts: BlogPost[] = [
    { id: 1, title: 'چگونه بهترین یخچال را انتخاب کنیم؟', summary: 'راهنمای کامل خرید ساید بای سایدها و دوقلوها...', image: 'https://placehold.co/400x200/555/fff?text=Blog+1' },
    { id: 2, title: '5 ترفند برای تمیز کردن اجاق گاز', summary: 'با این روش‌ها اجاق گاز شما مثل روز اول خواهد شد...', image: 'https://placehold.co/400x200/555/fff?text=Blog+2' },
    { id: 3, title: 'معرفی لوازم کوچک ترند 2024', summary: 'بهترین دستگاه‌های کوچک آشپزخانه را بشناسید...', image: 'https://placehold.co/400x200/555/fff?text=Blog+3' },
    { id: 4, title: 'راهنمای نگهداری ماشین لباسشویی', summary: 'افزایش طول عمر ماشین لباسشویی با نکات ساده...', image: 'https://placehold.co/400x200/555/fff?text=Blog+4' },
];

const features: Feature[] = [
  { id: 1, icon: Zap, title: 'تحویل سریع', description: 'ارسال فوری محصولات منتخب' },
  { id: 2, icon: Tag, title: 'بهترین قیمت', description: 'ضمانت کمترین قیمت بازار' },
  { id: 3, icon: Truck, title: 'ارسال رایگان', description: 'برای خریدهای بالای 10 میلیون' },
  { id: 4, icon: HelpCircle, title: 'پشتیبانی 24/7', description: 'پاسخگویی در تمام ایام هفته' },
];

// لوگوهای برندها (Frame 06)
const mockBrands = [
  { id: 1, name: 'BOSCH', logo: 'https://placehold.co/100x40/000/fff?text=BOSCH' },
  { id: 2, name: 'SAMSUNG', logo: 'https://placehold.co/100x40/1565C0/fff?text=SAMSUNG' },
  { id: 3, name: 'LG', logo: 'https://placehold.co/100x40/C62828/fff?text=LG' },
  { id: 4, name: 'TEFAL', logo: 'https://placehold.co/100x40/FFAB00/fff?text=TEFAL' },
  { id: 5, name: 'PHILIPS', logo: 'https://placehold.co/100x40/00E676/fff?text=PHILIPS' },
  { id: 6, name: 'KENWOOD', logo: 'https://placehold.co/100x40/9C27B0/fff?text=KENWOOD' },
  { id: 7, name: 'DEZENT', logo: 'https://placehold.co/100x40/000000/fff?text=DEZENT' },
];

// --- Utility Components ---

// فرمت‌دهی قیمت به تومان (مثال: 35,000,000 تومان)
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 relative border border-gray-100">
    {product.discountPercent && (
      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full rtl:shadow-md">
        %{product.discountPercent}-
      </span>
    )}
    <div className="flex justify-center mb-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain rounded-lg"
        onError={(e) => {
          (e.target as HTMLImageElement).onerror = null;
          (e.target as HTMLImageElement).src = `https://placehold.co/400x400/F3F4F6/9CA3AF?text=Product`;
        }}
      />
    </div>
    <h3 className="text-gray-800 text-lg font-semibold h-12 overflow-hidden mb-2">{product.name}</h3>
    <div className="flex items-center text-sm mb-4">
      <div className="flex text-yellow-400 rtl:ml-2 rtl:pl-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
            strokeWidth={1}
            className="rtl:ml-0.5"
          />
        ))}
      </div>
      <span className="text-gray-600">({product.reviews})</span>
    </div>
    <div className="flex flex-col items-start">
      {product.oldPrice && (
        <span className="text-gray-400 text-sm line-through">
          {formatPrice(product.oldPrice)}
        </span>
      )}
      <span className="text-2xl font-bold text-teal-600">
        {formatPrice(product.price)}
      </span>
    </div>
    <button className="mt-4 w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-200 shadow-md">
      افزودن به سبد
    </button>
  </div>
);

// --- New/Refactored Sections ---

// Frame 02 Section - Discount Banner
const DiscountBannerSection: React.FC = () => (
  <div className="container mx-auto px-4 py-16">
    <div className="bg-teal-600 rounded-3xl p-8 md:p-12 text-white flex flex-col lg:flex-row items-center justify-between shadow-2xl overflow-hidden relative">
        {/* Placeholder Icon (inspired by the discount tag in frame 02) */}
        <div className="absolute left-0 top-0 w-40 h-40 opacity-20 transform -translate-x-1/4 -translate-y-1/4">
            <Tag size={160} className="text-white" fill="currentColor" />
        </div>
        <div className="relative z-10 rtl:text-right mb-6 lg:mb-0">
            <p className="text-xl font-light mb-1">فروشگاه لوازم خانگی آروج</p>
            <h3 className="text-4xl lg:text-5xl font-extrabold mb-3">تخفیف‌های ویژه لوازم آشپزخانه</h3>
            <p className="text-2xl font-semibold text-yellow-300">تا 50% تخفیف در محصولات منتخب</p>
        </div>
        <a href="#" className="relative z-10 bg-white text-teal-600 font-bold text-lg py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg">
            مشاهده محصولات
        </a>
    </div>
  </div>
);

// Frame 03 Section - Double Banners
const DoubleBannerSection: React.FC = () => (
    <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between rtl:space-x-reverse rtl:space-x-6">
            {/* Banner 1 */}
            <div className="w-full md:w-1/2 mb-6 md:mb-0 relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 cursor-pointer">
                <img
                    src="https://placehold.co/600x177/EF4444/ffffff?text=Washing+Machines+Offer"
                    alt="تخفیف ماشین لباسشویی"
                    className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-start p-6 rtl:text-right">
                    <h4 className="text-white text-3xl font-bold">پیشنهاد شستشو <br/> تا 25%</h4>
                </div>
            </div>
            {/* Banner 2 */}
            <div className="w-full md:w-1/2 relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 cursor-pointer">
                 <img
                    src="https://placehold.co/600x177/F97316/ffffff?text=Small+Appliances+Sale"
                    alt="فروش ویژه لوازم کوچک"
                    className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-start p-6 rtl:text-right">
                    <h4 className="text-white text-3xl font-bold">لوازم کوچک <br/> تخفیف هیجان‌انگیز</h4>
                </div>
            </div>
        </div>
    </div>
);

// Frame 05 Section - Special Categories
const SpecialCategoriesSection: React.FC = () => (
  <div className="container mx-auto px-4 py-16">
    <h2 className="text-3xl font-bold text-gray-800 rtl:text-right mb-8 border-b-2 border-teal-500 inline-block pb-2">
      مجموعه‌های ویژه آروجی
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {specialCategories.map((category) => (
        <div key={category.id} className="relative group rounded-3xl overflow-hidden shadow-xl border-2 border-transparent hover:border-teal-500 transition duration-300">
            <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover aspect-square transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold p-4 text-center border-b-4 border-teal-400 group-hover:border-red-500 transition">{category.name}</h3>
            </div>
        </div>
      ))}
    </div>
  </div>
);

// Frame 06 Section - Brands
const BrandsSection: React.FC = () => (
  <div className="container mx-auto px-4 py-12">
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center rtl:text-right border-b pb-4 mb-4">
            <h2 className="text-xl font-bold text-gray-800">برندهای معتبر</h2>
            <a href="#" className="text-sm text-gray-600 hover:text-teal-600 flex items-center">
                مشاهده همه <ChevronLeft size={16} className="rtl:mr-1" />
            </a>
        </div>
        <div className="flex flex-wrap justify-around items-center gap-6 py-4">
            {mockBrands.map((brand) => (
                <div key={brand.id} className="opacity-70 hover:opacity-100 transition duration-300">
                    <img src={brand.logo} alt={brand.name} className="h-8 md:h-10 w-auto object-contain" />
                </div>
            ))}
        </div>
    </div>
  </div>
);

// Frame 08 Section - Blog
const BlogSection: React.FC = () => (
    <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center rtl:text-right mb-8">
            <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-teal-500 inline-block pb-2">مجله بلاگ</h2>
            <a href="#" className="text-teal-600 hover:text-teal-700 font-medium flex items-center">
                مشاهده بیشتر <ChevronLeft size={18} className="rtl:mr-1" />
            </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockBlogPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition duration-300">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-40 object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).onerror = null;
                            (e.target as HTMLImageElement).src = `https://placehold.co/400x200/555/fff?text=News`;
                        }}
                    />
                    <div className="p-4 rtl:text-right">
                        <h3 className="text-lg font-bold text-gray-800 h-14 overflow-hidden mb-2">{post.title}</h3>
                        <p className="text-sm text-gray-600 h-10 overflow-hidden mb-4">{post.summary}</p>
                        <a href="#" className="text-teal-600 font-semibold flex items-center justify-end hover:text-teal-700">
                            ادامه مطلب
                            <ChevronLeft size={16} className="rtl:mr-1" />
                        </a>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// Frame 09 Section - Floating CTA (مشاوره)
const FloatingCta: React.FC = () => (
  <div className="fixed bottom-6 rtl:left-6 rtl:right-auto z-40">
    <div className="bg-red-500 text-white p-4 rounded-full shadow-2xl cursor-pointer hover:bg-red-600 transition duration-300 transform hover:scale-105 group">
        <MessageSquare size={28} />
        <span className="absolute rtl:left-16 rtl:right-auto top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            مشاوره آنلاین
        </span>
    </div>
  </div>
);


// --- Main App Component ---

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navbar Component (بدون تغییر)
  const Header: React.FC = () => (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-teal-600 text-white text-center text-sm py-2">
        کد تخفیف: WELCOME503 - ارسال رایگان برای خریدهای بالای 500,000 تومان
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and Menu */}
        <div className="flex items-center">
          <h1 className="text-3xl font-extrabold text-teal-700 rtl:ml-8">AROJ</h1>
          <nav className="hidden lg:flex rtl:space-x-reverse rtl:space-x-6 text-gray-600 font-medium">
            <a href="#" className="hover:text-teal-600 transition">صفحه اصلی</a>
            <a href="#" className="hover:text-teal-600 transition">فروشگاه</a>
            <a href="#" className="hover:text-teal-600 transition">تخفیفات</a>
            <a href="#" className="hover:text-teal-600 transition">مجله (بلاگ)</a>
            <a href="#" className="hover:text-teal-600 transition">تماس با ما</a>
          </nav>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-grow max-w-lg mx-8 border border-gray-300 rounded-full overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="جستجوی محصولات..."
            className="flex-grow p-2 rtl:pr-5 rtl:pl-2 text-gray-700 focus:outline-none placeholder-gray-400 bg-gray-50 rtl:text-right"
          />
          <button className="bg-teal-600 text-white p-3 hover:bg-teal-700 transition">
            <Search size={20} />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center rtl:space-x-reverse rtl:space-x-4">
          <button className="p-2 text-gray-600 hover:text-teal-600 transition rounded-full hover:bg-gray-100">
            <User size={24} />
          </button>
          <button className="p-2 text-gray-600 hover:text-teal-600 transition rounded-full hover:bg-gray-100 relative">
            <ShoppingCart size={24} />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span>
          </button>
          <button 
            className="lg:hidden p-2 text-gray-600 hover:text-teal-600 transition rounded-full hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-gray-50`}>
        <div className="px-4 py-2 border-t">
          <nav className="flex flex-col rtl:space-y-2 text-gray-700 font-medium">
            <a href="#" className="py-2 block hover:text-teal-600 transition border-b border-gray-200">صفحه اصلی</a>
            <a href="#" className="py-2 block hover:text-teal-600 transition border-b border-gray-200">فروشگاه</a>
            <a href="#" className="py-2 block hover:text-teal-600 transition border-b border-gray-200">تخفیفات</a>
            <a href="#" className="py-2 block hover:text-teal-600 transition border-b border-gray-200">مجله (بلاگ)</a>
            <a href="#" className="py-2 block hover:text-teal-600 transition">تماس با ما</a>
          </nav>
        </div>
      </div>
    </header>
  );

  // Hero Section (بدون تغییر)
  const HeroSection: React.FC = () => (
    <div className="relative bg-gray-100 overflow-hidden" style={{ minHeight: '400px' }}>
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center rtl:space-x-reverse rtl:space-x-8">
        
        {/* Text Content (Left/Start) */}
        <div className="w-full md:w-1/2 rtl:text-right mb-10 md:mb-0">
          <p className="text-teal-600 text-lg font-semibold mb-2">تخفیفات ویژه آغاز شد!</p>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
            لوازم خانگی <span className="text-red-500">مدرن</span>،
            <br />
            زندگی <span className="text-teal-600">آسان</span>‌تر
          </h2>
          <p className="text-gray-600 text-xl mb-6 max-w-md">
            با کیفیت‌ترین و جدیدترین محصولات آشپزخانه، شستشو و سرمایشی را در آروجی پیدا کنید.
          </p>
          <a href="#" className="inline-flex items-center bg-teal-600 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-teal-700 transition duration-300 transform hover:scale-105">
            مشاهده تخفیف‌ها
          </a>
        </div>

        {/* Image/Visual (Right/End) - Placeholder inspired by the banner in Frame 26088145.jpg */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <img
            src="https://placehold.co/600x400/0F9592/ffffff?text=Modern+Appliances+Collection"
            alt="مجموعه لوازم خانگی مدرن"
            className="w-full max-w-md md:max-w-none h-auto rounded-3xl shadow-2xl"
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/0F9592/ffffff?text=Banner';
            }}
          />
        </div>
      </div>
    </div>
  );

  // Features Section (بدون تغییر)
  const FeaturesSection: React.FC = () => (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div key={feature.id} className="flex items-start rtl:space-x-reverse rtl:space-x-4 p-4 bg-white rounded-xl shadow-md border border-gray-100">
            <feature.icon className="text-teal-600 flex-shrink-0 mt-1" size={28} />
            <div className="rtl:text-right">
              <h4 className="font-bold text-gray-800 text-lg">{feature.title}</h4>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Flash Sale/Promo Banner (Frame 01/07 - تغییر یافته)
  const FlashSaleBanner: React.FC = () => (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-pink-50 rounded-2xl p-8 lg:p-12 text-gray-800 flex flex-col lg:flex-row items-center justify-between shadow-2xl border-4 border-red-400">
        <div className="rtl:text-right mb-6 lg:mb-0">
          <h3 className="text-3xl lg:text-4xl font-extrabold mb-2 text-red-600">فروش شگفت‌انگیز!</h3>
          <p className="text-xl font-medium text-gray-700">فرصت محدود برای خرید محصولات منتخب با تخفیف‌های باورنکردنی!</p>
        </div>
        <div className="flex items-center rtl:space-x-reverse rtl:space-x-4 bg-red-600 p-4 rounded-xl text-white shadow-xl">
            <Clock size={32} className="text-yellow-300 animate-pulse" />
            <div className="rtl:text-right">
                <span className="text-lg font-semibold">پایان در:</span>
                <p className="text-3xl font-extrabold tracking-wider">04:23:59</p>
            </div>
        </div>
      </div>
    </div>
  );

  // Product List Section (Frame 04 - تغییر یافته)
  const FeaturedProductsSection: React.FC = () => (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-800 rtl:text-right mb-8 border-b-2 border-teal-500 inline-block pb-2">
        محصولات پرفروش هفته
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <a href="#" className="text-teal-600 hover:text-teal-700 font-semibold text-lg flex items-center border border-teal-600 py-2 px-6 rounded-full transition">
          مشاهده تمام محصولات
          <ChevronLeft size={20} className="rtl:mr-1" />
        </a>
      </div>
    </div>
  );


  // Footer Component (بدون تغییر)
  const Footer: React.FC = () => (
    <footer className="bg-gray-900 text-white mt-16 pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Newsletter and Socials */}
        <div className="flex flex-col lg:flex-row justify-between items-center border-b border-gray-700 pb-8 mb-8 rtl:space-x-reverse rtl:space-x-8">
          <div className="rtl:text-right mb-6 lg:mb-0">
            <h4 className="text-2xl font-bold mb-1">عضویت در خبرنامه</h4>
            <p className="text-gray-400">از جدیدترین تخفیف‌ها و محصولات باخبر شوید.</p>
          </div>
          <div className="w-full lg:w-96 flex">
            <input
              type="email"
              placeholder="ایمیل خود را وارد کنید..."
              className="flex-grow p-3 rounded-r-lg rtl:rounded-none rtl:rounded-l-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-l-lg rtl:rounded-none rtl:rounded-r-lg font-semibold transition">
              عضویت
            </button>
          </div>
        </div>

        {/* Footer Links and Contact */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 rtl:text-right mb-10">
          <div>
            <h5 className="font-bold text-lg mb-4 text-teal-400">دسترسی سریع</h5>
            <ul className="rtl:space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-teal-500 transition">صفحه اصلی</a></li>
              <li><a href="#" className="hover:text-teal-500 transition">محصولات پرفروش</a></li>
              <li><a href="#" className="hover:text-teal-500 transition">تخفیفات روز</a></li>
              <li><a href="#" className="hover:text-teal-500 transition">تماس با ما</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4 text-teal-400">خدمات مشتریان</h5>
            <ul className="rtl:space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-teal-500 transition">شرایط عودت کالا</a></li>
              <li><a href="#" className="hover:text-teal-500 transition">حریم خصوصی</a></li>
              <li><a href="#" className="hover:text-teal-500 transition">پیگیری سفارش</a></li>
              <li><a href="#" className="hover:text-teal-500 transition">سوالات متداول</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h5 className="font-bold text-lg mb-4 text-teal-400">تماس با ما</h5>
            <div className="rtl:space-y-3 text-gray-400">
              <p className="flex items-center rtl:space-x-reverse rtl:space-x-2"><MapPin size={18} className="text-teal-500" />تهران، خیابان ولیعصر، پلاک 100</p>
              <p className="flex items-center rtl:space-x-reverse rtl:space-x-2"><Phone size={18} className="text-teal-500" />021-12345678</p>
              <p className="flex items-center rtl:space-x-reverse rtl:space-x-2"><Mail size={18} className="text-teal-500" />info@arojshop.com</p>
              <p className="flex items-center rtl:space-x-reverse rtl:space-x-2"><Clock size={18} className="text-teal-500" />پشتیبانی 9 صبح تا 9 شب</p>
            </div>
          </div>
        </div>

        {/* Copyright and Trust Logos */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="mb-4 md:mb-0">کلیه حقوق این سایت متعلق به فروشگاه آروجی است.</p>
          <div className="flex rtl:space-x-reverse rtl:space-x-4">
            {/* E-Namad Placeholder */}
            <div className="bg-gray-700 w-16 h-16 rounded-lg flex items-center justify-center text-xs">
              <span className="text-teal-400">اینماد</span>
            </div>
            {/* Samandehi Placeholder */}
            <div className="bg-gray-700 w-16 h-16 rounded-lg flex items-center justify-center text-xs">
              <span className="text-teal-400">ساماندهی</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );


  return (
    // Set dir="rtl" for the entire application for correct Persian display
    <div className="min-h-screen bg-gray-50 font-['Inter']" dir="rtl">
      {/* Load Tailwind CSS from CDN - REQUIRED for single HTML/React file setup */}
      <script src="https://cdn.tailwindcss.com"></script>
      
      <Header />
      <main>
        <HeroSection /> {/* بخش هیرو */}
        <FeaturesSection /> {/* ویژگی‌های کلیدی */}
        <DiscountBannerSection /> {/* Frame 02: بنر تخفیف اصلی */}
        <DoubleBannerSection /> {/* Frame 03: دو بنر تبلیغاتی */}
        <FeaturedProductsSection /> {/* Frame 04: محصولات پرفروش */}
        <SpecialCategoriesSection /> {/* Frame 05: دسته‌بندی‌های ویژه (تصاویر بزرگ) */}
        <BrandsSection /> {/* Frame 06: بخش برندها */}
        <FlashSaleBanner /> {/* Frame 07 (و 01): بنر فروش شگفت‌انگیز */}
        <BlogSection /> {/* Frame 08: مجله بلاگ */}
        {/* Frame 09: مشاوره آنلاین به صورت شناور */}
      </main>
      <Footer />
      <FloatingCta /> 
    </div>
  );
};

export default App;
