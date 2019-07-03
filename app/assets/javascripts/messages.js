$(function(){
  

  function buildMessage(message){
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
                  <img class="lower-message__image" src=“${message.image}”Test image">
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
      var html = buildMessage(message);
      $('.messages').append(html)
      $('#message_content.form__message').val('')
    })
    .fail(function(){
    })
  })
});