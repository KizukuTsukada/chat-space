class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages
  # validates :name, presence: true, uniqueness: true

  validate :add_error_name

  def show_last_message
    if (last_message = messages.last).present?
      last_message.content? ? last_message.content : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end

   def add_error_name
      # nameが空のときにエラーメッセージを追加する
      if name.blank?
        errors[:base] << "グループ名を入力してください"
      end
   end
end
