'use strict';

var editIndex;
var origTime;

$(document).ready(init);

function init() {
  $('.save').on('click',saveMessage);
  $('.edit').on('click',editContact);
  $('.modalSaveBtn').on('click',modalUpdate);
}

function modalUpdate(){

  var $modalName = $('#modalInputName').val();
  var $modalMessage = $('#modalInputMessage').val();

  var time = new Date().toUTCString();

  var edit= {};
  edit.origtime = origTime;

  if($modalName !== ''){
    edit.name = $modalName;
    edit.time = time;
    $('#sample:nth-child('+(editIndex + 1)+')').find('.name').text($modalName);
    $('#sample:nth-child('+(editIndex + 1)+')').find('.time').text(time);
  }
  if($modalMessage !== ''){
    edit.message = $modalMessage;
    edit.time = time;
    $('#sample:nth-child('+(editIndex + 1)+')').find('.message').text($modalMessage);
    $('#sample:nth-child('+(editIndex + 1)+')').find('.time').text(time);
  }

  $.post('/messageboard/edit',{edit: edit})
   .done(function(data){
    console.log(data);
   })
   .fail(function(err){
    console.log(err);
   })
  
  $('#myModal').modal('hide');

}

function editContact(){
  editIndex = $(this).closest('tr').index();
  origTime = $(this).closest('tr').children('.time').text()
}

function saveMessage(){

  var data = {};

  data.name = $('#name').val();
  data.message = $('#message').val();
  data.time = new Date().toUTCString();

  $.post('/messageboard',{data: data})
   .done(function(data){
      createRow(data);
      console.log(data);
    })
   .fail(function(err){
       console.log(err);
    })

  $('#name').val('');
  $('#message').val('');
  $('#exampleModal').modal('hide');
}

function createRow(data){
  var $tr = $('#sample').clone();

  $tr.find('.name').text(data.name);
  $tr.find('.message').text(data.message);
  $tr.find('.time').text(data.time);

  $('#list').append($tr);
  // var $tr = $('<tr>');
  // var $name = $('<td>').text(data.name);
  // var $message = $('<td>').text(data.message);
  // var $time = $('<td>').text(data.time);

  // $tr.append($name,$message,$time);
  // $('#list').append($tr);
}









