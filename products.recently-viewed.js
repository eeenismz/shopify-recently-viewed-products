Shopify.shop_name = Shopify.shop.split('.')[0]
Shopify.recentProductHistoryMax = 3; //If you want to display 4 items, Change max number to 3.[itemmax-1]
Shopify.recentProductsKey = Shopify.shop_name+'.products.recent_products';

Shopify.RecentlyViewed = (function() {

  function storeRecentProducts(recentProducts) {
    window.localStorage.setItem(Shopify.recentProductsKey, JSON.stringify(recentProducts));
  };
  function getRecentProducts() {
    var existingValue = window.localStorage.getItem(Shopify.recentProductsKey);
    if (existingValue) {
      try {
        return JSON.parse(existingValue);
      } catch (error) {}
    }
    return [];
  };

  function RecentlyViewed(container) {
    this.$container = $(container);
    
    var productData = {
      title: this.$container.data('title'),
      id: this.$container.data('id'),
      grid_item: this.$container.data('grid-item'),
    };
    
    // make sure that the current product does not show on the recent products list
    // happens when one goes back
    var existing = getRecentProducts().filter(e=>e.id !== productData.id);
    
    if (existing.length > 1) {
          // Limit the number of recent products
          if (existing.length > Shopify.recentProductHistoryMax){
            existing.length = Shopify.recentProductHistoryMax;
          }
          this.$container.removeAttr('hidden');
        }
    // add the current product to thelist of recent products
    existing.unshift(productData);    
    storeRecentProducts(existing)
  }
  return RecentlyViewed;
})();

var Shopify = Shopify || {};

if ($(".product-recently-viewed").length>0){
  Shopify.RecentlyViewed(".product-recently-viewed")
};
