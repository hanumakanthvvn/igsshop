class CreatePromotedItems < ActiveRecord::Migration
  def self.up
    create_table :promoted_items do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :promoted_items
  end
end
