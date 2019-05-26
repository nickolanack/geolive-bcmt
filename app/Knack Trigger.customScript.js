Emit('onKnackTriggerStart',$eventArgs);

getWidget($eventArgs->widget)->syncWithKnack($eventArgs);


Emit('onKnackTriggerEnd',$eventArgs);