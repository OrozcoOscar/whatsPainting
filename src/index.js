console.clear()
const open=require("open")
/*//////////////----Compilado---------/////////////////////
const Server=require("./modules/server.js")
const Tabla=require("./modules/tabla.js")
const Emit=require("./modules/emit.js")
const IP=require("./modules/ip.js")
//////////////////////////////////////////////
const server=new Server(3000,"./public")


/*//////////////-------Desarollo------/////////////////////////
const path=require("path")
const carpeta=path.join(__dirname,'modules')
const Server=require(path.join(carpeta,"server.js"))
const Tabla=require(path.join(carpeta,"tabla.js"))
const Emit=require(path.join(carpeta,"emit.js"))
const IP=require(path.join(carpeta,"ip.js"))
//////////////////////////////////////////////
const server=new Server(3000,path.join(__dirname,"/public"))
//////////////////////////////////////////////////////////*/

//////////////////Sokets /////////////////////////////
const socket=require("socket.io")
const io=socket(server)
let emitir=new Emit(io)
////////////////////////////////////////////
let PLAYERS=new Tabla();
let SALAS=new Tabla();
console.log("Server on http://"+IP()+":3000")
console.log("Espere...")
open("http://"+IP()+":3000")
////////////////////////////////////////////
io.on("connection",(cliente)=>{
	console.log("se ha conectado ",cliente.id)
	let sala="null",user="null";
	cliente.join(sala)

	cliente.on("sala",(e)=>{
		emitir.todos_en(sala,"server",e)//emite a todos los que esten en la sala
	})
	cliente.on("crono",(e)=>{
		emitir.todos_en(sala,"crono",e)//emite a todos los que esten en la sala
	})
	///////////////////////////////////////
	// Crear sistema de turnos 
	
	////////////////////////////////////
	cliente.on("salaInit",(e)=>{
		cliente.leave(sala)
		cliente.join(e.sala)
		sala=e.sala
		user=e.user
		//--------------------//
		let netx=SALAS.inTabla("id",sala);
		let puedeSetear=false
		if(netx>-1){
			if(SALAS.data[netx].players.length<SALAS.data[netx].max){//si menos de dos player
				puedeSetear=true
			}else{
			emitir.mi("PRIVATE","alert('Sala llena');window.location.href='../?usr="+user+"'")//envia al cliente actual
			
			}
		}else{
			puedeSetear=true
		}
		if(puedeSetear){
				let setPlayer=PLAYERS.set({
					user:user,
					id:cliente.id,
					estado:"En sala"
					},"user",SALAS,"players",{
						id:sala,
						max:e.max,
						turno:0,
						players:[]
					},"id")
				if(setPlayer==100){
					user=null
					emitir.mi("PRIVATE","alert('Ya existe un usuario con ese nombre');window.location.href='../?id="+sala+"&usr="+user+"'")
					return;
				}
				netx=SALAS.inTabla("id",sala);
				if(SALAS.data[netx].players.length>1){//reseteo el estado de los jugadores
					for (var i = 0; i < SALAS.data[netx].players.length; i++) {
						let po=PLAYERS.inTabla("user",SALAS.data[netx].players[i])
						PLAYERS.data[po].estado="Jugando"
					}
				}
				else{
					PLAYERS.data[PLAYERS.inTabla("user",user)].estado="En sala"
				}

		}
		//--------------------//
		console.clear()
		console.log("Salas:",SALAS.data)
		console.log("Players:",PLAYERS.data)
		//*/
		emitir.todos("serverPlayers",PLAYERS.data)//envia a todos en el server
		emitir.todos("serverSalas",SALAS.data)
		emitir.mi(cliente,"ok",PLAYERS.data)
	})
	cliente.on("play",(e)=>{
		emitir.todos("play",e)
	})
	cliente.on("getSalas",()=>{
		emitir.todos("serverSalas",SALAS.data)
	})
	cliente.on("turno",(e)=>{
			let s=SALAS.inTabla("id",sala);
			if(s>-1){
				if (e.t>=parseInt(SALAS.data[s].max)){
					e.t=0
					SALAS.data[s].turno=0
				}
				else if(e.t>parseInt(SALAS.data[s].turno))SALAS.data[s].turno=e.t
				let t=SALAS.data[s].players[parseInt(SALAS.data[s].turno)]
				let p=PLAYERS.inTabla("user",t)
				if(p>-1)emitir.a(PLAYERS.data[p].id,"turno",{id:PLAYERS.data[p].id,t:parseInt(SALAS.data[s].turno)})		
	
			}
	})
	cliente.on("fin",(e)=>{		
		emitir.todos_exceptuandome_en(cliente,sala,"fin",e)
	
	})
	cliente.on("disconnect",()=>{//disconnect es un evento propio e lenguaje//
		let netx=SALAS.inTabla("id",sala);
		if(PLAYERS.inTabla("user",user)>-1 && netx>-1){
			
			if(SALAS.data[netx].players.length==1){//reseteo el estado de los jugadores
					for (var i = 0; i < SALAS.data[netx].players.length; i++) {
						let po=PLAYERS.inTabla("user",SALAS.data[netx].players[i])
						PLAYERS.data[po].estado="En sala"
					}
				}
				PLAYERS.remove("user",user,SALAS)//elimno al player y sus relaciones

			//------------------------------------//
			if(SALAS.data[netx].players.length<1){//si la sala esta bacia la elimino
				SALAS.remove("id",sala)//elimino la sala si ya esta vacia 
			}
			//------------------------------------//
			emitir.todos("serverPlayers",PLAYERS.data)//envio los jugadores 
			
		}
		console.clear()
		console.log("Salas:",SALAS.data)
		console.log("Players:",PLAYERS.data)
		emitir.todos("serverSalas",SALAS.data)
		//*/
	})
})





