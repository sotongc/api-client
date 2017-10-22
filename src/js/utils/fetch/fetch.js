const fetchRequest = function(url,init){
	return fetch(new Request(url,init))
};

const aop=function(res){
	return res;
};

const toJson=function(res){
	return res.json();
};

export default {
	get(url){
		return fetchRequest(url,{
			method:'GET',
			mode:'cors',
			headers:{
				'Content-type':'application/json'
			}
		}).then(toJson).then(aop);
	},
	post(url,data){
		return fetchRequest(url,{
			method:'POST',
			mode:'cors',
			headers:{
				'Content-type':'application/json'
			},
			body:JSON.strigify(data)
		}).then(toJson).then(aop);
	},
	delete(url){
		return fetchRequest(url,{
			method:'DELETE',
			mode:'cors',
			headers:{
				'Content-type':'application/json'
			}
		}).then(toJson).then(aop);
	},
	put(url,data){
		return fetchRequest(url,{
			method:'PUT',
			mode:'cors',
			headers:{
				'Content-type':'application/json'
			},
			body:JSON.strigify(data)
		}).then(toJson).then(aop);
	},
	upload(url,file){
		return fetchRequest(url,{
			method:'POST',
			mode:'cors',
			headers:{
				'Content-type':'application/json'
			},
			body:file
		}).then(toJson).then(aop);
	}
};



