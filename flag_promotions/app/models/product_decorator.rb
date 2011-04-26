 Product.instance_eval do
    def get_product_names
      all.map(&:name)
    end
  end
