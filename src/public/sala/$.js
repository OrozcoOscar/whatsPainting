function $(argument){class obj{constructor(e){this.element=e,this.this=this.element}html(e){if(this.element.length>1)for(var t=0;t<this.element.length;t++)this.element[t].this.innerHTML=(e);else this.element.innerHTML=(e);}event(e,f){if(this.element.length>1)for(var t=0;t<this.element.length;t++)this.element[t].this.addEventListener(e,f);else this.element.addEventListener(e,f)}val(e){return e?this.element.value=e:this.element.value}src(e){return e?this.element.src=e:this.element.src}attr(e,i){if(this.element.length>1)for(var t=0;t<this.element.length;t++)this.element[t].setAttribute(e,i);else this.element.setAttribute(e,i)}append(e){if(this.element.length>1)for(var t=0;t<this.element.length;t++)this.element[t].this.innerHTML+=e;else this.element.innerHTML+=e}css(obj){if(this.element.length>1)for(var i=0;i<this.element.length;i++)for(let p in obj)eval("this.element["+i+"].this.style."+p+"='"+obj[p]+"'");else for(let p in obj)eval("this.element.style."+p+"='"+obj[p]+"'")}toggleClass(e){if(this.element.length>1)for(var t=0;t<this.element.length;t++)this.element[t].this.classList.toggle(e);else this.element.classList.toggle(e)}}let n;if(document.querySelectorAll(argument).length>1){n=[];for(var i=0;i<document.querySelectorAll(argument).length;i++)n.push(new obj(document.querySelectorAll(argument)[i]))}else n=document.querySelectorAll(argument)[0];try{return n.length,new obj(n)}catch(e){}}
function createMatriz(f,c,r=0) {let m=[f];for (var i = 0; i <f; i++) {m[i]=[];for (var e = 0; e < c; e++) {m[i][e]=r;}}return m;}
function Random(min, max) { return Math.floor(Math.random() * (max - min)) + min;}//no incluye al max
function Get() {let cont=window.location.search;if(cont.indexOf("=")>-1){let json="{";let get=cont.replace("?","");get=get.split("&");get.map((e,i)=>{e=e.split("=");if(i<get.length-1)json+="\""+e[0]+"\":\""+e[1].replace(/%20/g," ")+"\",";else json+="\""+e[0]+"\":\""+e[1].replace(/%20/g," ")+"\""+"}";});return JSON.parse(json);}else return null;}
function toRad(g) {
	return g*Math.PI/180
}
function toGrad(r) {
	return r*180/Math.PI
}
class Canvas{
	constructor(obj="canvas"){
		this.this=$(obj).this;
		this.element=$(obj)
		if(this.this)this.ctx=this.this.getContext("2d");
		else console.error("NO se encuentra un elemnto canvas");
	}
	clear(n){
		if(n){
			this.rect(0,0,this.this.width,this.this.height,"rgb("+n+")",true)
		}else{
			this.this.width=this.this.width;
		}
	}

	getCanvas(){
		return $("canvas");
	}
	rect(x,y,w,h,c,f=false,r=false){
		if(r){
			if(Number(r)){
				this.ctx.beginPath()
				this.ctx.save();
				this.ctx.fillStyle =c;
				this.ctx.strokeStyle =c;
				this.ctx.arc(x+r,y+r,r,toRad(180),toRad(-90));
				this.ctx.arc(x+w-r,y+r,r,toRad(-90),toRad(0));
				this.ctx.arc(x+w-r,y+h-r,r,toRad(0),toRad(90));
				this.ctx.arc(x+r,y+h-r,r,toRad(90),toRad(180));
				this.ctx.moveTo(x,y+r);
	       		this.ctx.lineTo(x,y+h-r);
				this.ctx.stroke();
			}else{
				this.ctx.beginPath()
				this.ctx.save();
				this.ctx.fillStyle =c;
				this.ctx.strokeStyle =c;
				this.ctx.arc(x+r[0],y+r[0],r[0],toRad(180),toRad(-90));
				this.ctx.arc(x+w-r[1],y+r[1],r[1],toRad(-90),toRad(0));
				this.ctx.arc(x+w-r[2],y+h-r[2],r[2],toRad(0),toRad(90));
				this.ctx.arc(x+r[3],y+h-r[3],r[3],toRad(90),toRad(180));
				this.ctx.moveTo(x,y+r[0]);
	       		this.ctx.lineTo(x,y+h-r[3]);
				this.ctx.stroke();
			}
			if(f)this.ctx.fill();
		}else{
			if(f){
				this.ctx.fillStyle=c;
				this.ctx.fillRect(x,y,w,h);
			}else{
				this.ctx.strokeStyle=c;
				this.ctx.strokeRect(x,y,w,h);
			}
		}
	
	}
	circle(x,y,r,c,f=false){
		this.ctx.beginPath()
		this.ctx.save();
		this.ctx.fillStyle =c;
		this.ctx.strokeStyle =c;
		this.ctx.arc(x,y,r,0,Math.PI*2);
		this.ctx.stroke();
		if(f)this.ctx.fill();
	}
	line(x,y,xf,yf,c){
		this.ctx.beginPath();
		this.ctx.save();
		this.ctx.strokeStyle =c;
		this.ctx.moveTo(xf,yf);
        this.ctx.lineTo(x,y);
        this.ctx.stroke();
			
	}
	text(t,x,y,s=23,c="green"){
		this.ctx.fillStyle=c;
		this.ctx.font="bold "+s+"px sans-serif";
		this.ctx.fillText(t,x,y);
	}
	size(w=null,h=null){
		if(w)this.this.width=w;
		if(h)this.this.height=h;
		return {w:this.this.width,h:this.this.height}
	}
	fill(){
		this.this.width=innerWidth;
		this.this.height=innerHeight;
		$("body").css({margin:0,overflow:"hidden"});
	}
	event(e,f){
		this.element.event(e,f);
	}
}

