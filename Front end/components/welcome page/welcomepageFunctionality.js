const handleButtonClick=(newPage)=>{
    const eventData={message:newPage};
    const event = new CustomEvent('TriggerRouting',{detail: eventData});

    document.dispatchEvent(event);
}