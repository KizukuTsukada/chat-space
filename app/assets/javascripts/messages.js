$(function(){
    function buildMessage(message){
      var insertImage = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
      var html = `<div class="message">
                    <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                    ${message.name}
                    </p>
                    <p class="message__upper-info__date">
                    ${message.date}
                    </p>
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
      console.log(message)
      var html = buildMessage(message);
      $('.form__submit').attr('disabled', false);
      $('.messages').append(html)
      $('#message_content.form__message').val('')
      $('.messages').animate({ scrollTop: $(".messages")[0].scrollHeight }, 500);
    })
    .fail(function(){
      alert('投稿に失敗しました');
    })
  })
});