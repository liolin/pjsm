/*
 * A pure JavaScript multiselect library.
 *
 * @author Olivier Lischer <olivier.lischer@liolin.ch>
 * @version 0.1.0
 */

/** Item Switch callback **/
const switchItem = function(obj, multiselect){
    obj.parentElement.removeChild(obj);

    if(obj.className === 'pjsm-enabled-item'){
	obj.className = 'pjsm-available-item';
	multiselect.container.querySelector('.pjsm-available .pjsm-list').appendChild(obj);
	multiselect.object.querySelector('.'+obj.querySelector('span').className.replace('span', 'option')).selected = false;
    }
    else{
	obj.className = 'pjsm-enabled-item';	
	multiselect.container.querySelector('.pjsm-enabled .pjsm-list').appendChild(obj);
	multiselect.object.querySelector('.'+obj.querySelector('span').className.replace('span', 'option')).selected = true;
    }
};

function Multiselect(object){
    /** functions **/ 
    this.createElement = function(tag, options){
	let object = document.createElement(tag);
	for(let key in options){
	    let attribute = document.createAttribute(key);
	    attribute.value = options[key];
	    object.setAttributeNode(attribute);
	}
	return object;
    }
    this.insertAfter = function(newNode, after){
	after.parentNode.insertBefore(newNode, after);
    }

    
    /** class variabels **/
    this.object = object;
    this.object.style.display = 'none';
    this.container = this.createElement('div', {'class': 'pjsm-container'});
    this.available = this.createElement('div', {'class': 'pjsm-available'});
    this.middle = this.createElement('div', {'class': 'pjsm-middle'});
    this.enabled = this.createElement('div', {'class': 'pjsm-enabled'});
    this.list = this.createElement('ul', {'class': 'pjsm-list'});
    this.emptyList = this.createElement('ul', {'class': 'pjsm-list'});
    const that = this;


    /** get values from select field **/
    for(let i = 0; i < this.object.options.length; i++){
	let li = this.createElement('li');
	let span = this.createElement('span');

	this.object[i].className = 'pjsm-'+i+'-option';
	span.innerText = this.object[i].text;
	span.className = this.object[i].className.replace('option', 'span');
	
	li.appendChild(span);
	li.classList = 'pjsm-available-item'
	li.addEventListener('click', function(){
	    switchItem(li, that);
	})
	this.list.appendChild(li);
    }

    
    /** init multiselect html **/
    this.insertAfter(this.container, this.object);
    this.available.appendChild(this.list);
    this.container.appendChild(this.available);
    this.container.appendChild(this.middle);
    this.enabled.appendChild(this.emptyList);
    this.container.appendChild(this.enabled);
}
