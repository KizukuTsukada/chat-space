$(function(){
    function buildMessage(message){
      var insertImage = message.image.url == null ? "" : `<img src="${message.image.url}" class="lower-message__image">`
      if(message.image.url == null && message.content == ""){
        ;
      } else {
      var html = `<div class="message" data-id=${message.id}>
                    <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                    ${message.user_name}
                    </p>
                    <p class="message__upper-info__date">
                    ${message.created_at}
                    </p>
                    </div>
                    <div class="lower-message"></div>
                    <p class="lower-message__content">
                    ${message.content}
                    </p>
                    </p>
                      ${insertImage}
                    </div>`
      return html; 
    } 
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.form__submit').attr('disabled', false);
      $('.messages').append(html)
      $('.messages').animate({ scrollTop: $(".messages")[0].scrollHeight }, 500)
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('投稿に失敗しました');
    })
  })

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    if (location.href.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $('.message').last().data('id');
    $.ajax({
      url: './api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })

    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      messages.forEach(function(message){
      //メッセージが入ったHTMLを取得
      insertHTML += buildMessage(message)
      //メッセージを追加
      $('.messages').append(insertHTML)
      $('.messages').animate({ scrollTop: $(".messages")[0].scrollHeight }, 500);
      })
    })

    .fail(function() {
      alert('自動更新に失敗しました');
    });
  } else {
    clearInterval(reloadMessages);
  }
  };
  setInterval(reloadMessages, 3000);
});

