$(function(){

	var $orders = $('.orders');
	var $name = $('#name');
	var $drink = $('#drink');

	var orderTemplate = $('#order-template').html();

	function addOrders(order){
		$orders.append(Mustache.render(orderTemplate,order));
	}

	// GET 
	$.ajax({
			type:'GET',
			url:'http://localhost:3000/orders',
			success:function(orders){
				$.each(orders,function(i,order){
					addOrders(order);
				});
			},
			error:function(){
				alert('error loading orders');
			}
		});

	// POST

	 $('#add-order').on('click',function(){
	 	var order = {
	 		name: $name.val(),
	 		drink:$drink.val()
	 	}

	 	$.ajax({
			type:'POST',
			url:'http://localhost:3000/orders',
			data:order,
			success:function(newOrder){
				addOrders(newOrder);
			},
			error:function(){
				alert('error saving orders');
			}
		});

	 });



	 //UPDATE

	 $('.orders').on('click','.editOrder',function(){
	 	var $li = $(this).closest('li');
	 	$li.find('input.name').val( $li.find('input.name').html() );
	 	$li.find('input.drink').val( $li.find('input.drink').html() );
	 	$li.addClass('edit');

	  }); // edit button pressed

	 $('.orders').on('click','.cancelEdit',function(){
	 	var $li = $(this).closest('li');
	 	$li.removeClass('edit');

	  }); // cancel button pressed

	 $('.orders').on('click','.saveEdit',function(){
	 	var $li = $(this).closest('li');
	 	var order = {
	 		name: $li.find('input.name').val(),
	 		drink:$li.find('input.drink').val()
	 	};

	 	$.ajax({
			type:'PUT',
			url:'http://localhost:3000/orders/'+$li.attr('data-id'),
			data:order,
			success:function(newOrder){
				$li.find('span.name').html(order.name);
				$li.find('span.drink').html(order.drink);
				$li.removeClass('edit');
			},
			error:function(){
				alert('error updating orders');
			}
		});


	  }); // save button pressed




	 //DELETE

	 $('.orders').on('click','.remove',function(){

	 	var $li = $(this).closest('li');
	 	

	 	$.ajax({
			type:'DELETE',
			url:'http://localhost:3000/orders/' + $(this).attr('data-id'),

			success:function(){
				$li.fadeOut(300,function(){
					$(this).remove();
				});
			},
			error:function(){
				alert('error deleting orders');
			}
		});

	 });



});