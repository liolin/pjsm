/*
 * A pure JavaScript multiselect library.
 *
 * @author Olivier Lischer <olivier.lischer@liolin.ch>
 * @version 0.2.0
 */

/** Item Switch callback **/
const switchItem = function(obj, multiselect){
    let ul = [];
    let selected = false;
    obj.parentElement.removeChild(obj);

    if(obj.className === 'pjsm-enabled-item'){
	obj.className = 'pjsm-available-item';
	ul = multiselect.available.querySelector('.pjsm-list');
	selected = false;
    }
    else{
	obj.className = 'pjsm-enabled-item';
	ul = multiselect.enabled.querySelector('.pjsm-list');
	selected = true;
    }

    let li = ul.getElementsByTagName('li');
    let inserted = false;

    for(let i = 0; i < li.length; i++){
	if(obj.childNodes[0].innerText < li[i].childNodes[0].innerText){
	    ul.insertBefore(obj, li[i]);
	    inserted = true;
	    break;
	}
    }
    if(!inserted){
	ul.insertBefore(obj, null);
    }
    multiselect.object.querySelector('.'+obj.querySelector('span').className.replace('span', 'option')).selected = selected;
};

function Multiselect(object){
    /** functions **/
    this.__createElement = function(tag, options){
	let object = document.createElement(tag);
	for(let key in options){
	    let attribute = document.createAttribute(key);
	    attribute.value = options[key];
	    object.setAttributeNode(attribute);
	}
	return object;
    }
    this.__insertAfter = function(newNode, after){
	after.parentNode.insertBefore(newNode, after);
    }
    
    /** class variabels **/
    this.object = object;
    this.object.style.display = 'none';
    this.container = this.__createElement('div', {'class': 'pjsm-container'});
    this.available = this.__createElement('div', {'class': 'pjsm-available'});
    this.middle = this.__createElement('div', {'class': 'pjsm-middle'});
    this.enabled = this.__createElement('div', {'class': 'pjsm-enabled'});
    this.list = this.__createElement('ul', {'class': 'pjsm-list'});
    this.emptyList = this.__createElement('ul', {'class': 'pjsm-list'});
    const that = this;


    /** get values from select field **/
    for(let i = 0; i < this.object.options.length; i++){
	let li = this.__createElement('li');
	let span = this.__createElement('span');

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
    this.__insertAfter(this.container, this.object);
    this.available.appendChild(this.list);
    this.container.appendChild(this.available);
    this.container.appendChild(this.middle);
    this.enabled.appendChild(this.emptyList);
    this.container.appendChild(this.enabled);
}
