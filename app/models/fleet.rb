class Fleet < ApplicationRecord
  def to_format
    {
      data: data
    }
  end
end
