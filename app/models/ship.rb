class Ship < ApplicationRecord
  def to_format
    {
      data: data,
      id: id
    }
  end
end
