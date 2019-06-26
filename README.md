# README
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name    |string |null: false, unique: true, index|
|email   |string |null: false, unique: true,      |

### Association
- has_many :message
- has_many :member
- has_many :groups, through: :members

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id |integer|null: false, foreign_key: true|a
|group_id|integer|null: false, foreign_key: true|

### Association
- has_many :user
- has_many :message

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id |integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id |integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|image   |string |                              |
|body    |text   |null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
