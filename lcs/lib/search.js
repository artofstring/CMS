
// -*- coding: utf-8 -*-

//1.1 Return list of match result for keyword.
function search(arr,param,b){
	var result = {};
	var matches = {};
	var stat = {};
	for (i=0;i<arr.sents.length;i++){
		var sn = arr.sents[i];
		for(j=0;j<sn.sen.length;j++){
			var wd = sn.sen[j];
			sfm = wd.sform;
			ps = wd.pos;
			lx = wd.lex;
			ss = wd.sens;
			if(param=="W"){
				if (sfm==b){
					matches[i.toString()+"_"+j.toString()]=arr.sents[i];
				}
			}else if(param=="S"){
				if (ss==b){
					matches[i.toString()+"_"+j.toString()]=arr.sents[i];
				}
			}else if(param=="P"){
				if (ps==b){
					matches[i.toString()+"_"+j.toString()]=arr.sents[i];
				}
			}else if(param=="L"){
				if (lx==b){
					matches[i.toString()+"_"+j.toString()]=arr.sents[i];
				}
			}else if(param=="W+1"|param=="W+2"|param=="P+1"|param=="P+2"||param=="L+1"|param=="L+2"){
				var cxt1 = findByContextNext(sn,j,param,b);
				if (cxt1){
					matches[i.toString()+"_"+j.toString()]=arr.sents[i];
				}
			}else if(param=="W-1"|param=="W-2"|param=="P-1"|param=="P-2"||param=="L-1"|param=="L-2"){
				var cxt1 = findByContextPrev(sn,j,param,b);
				if (cxt1){
					matches[i.toString()+"_"+j.toString()]=arr.sents[i];
				}
			}
		}
	}
	stat[b] = Object.keys(matches).length
	result["result"] = matches;
	result["stat"] = stat;
	return result;
}

function findByContextPrev(sn,wnum,param,key){
	params = param.split("_");
	if(params[1]=="1"){
		if (wnum-1>-1){
			if(params[0]=="W" && sn.sen[wnum-1].sform==key){
				return true;
			}
			if(params[0]=="P" && sn.sen[wnum-1].pos==key){
				return true;
			}
			if(params[0]=="L" && sn.sen[wnum-1].lex==key){
				return true;
			}
		}
	}
	if(params[1]=="2"){
		if (wnum-2>0){
			if(params[0]=="W" && sn.sen[wnum-2].sform==key){
				return true;
			}
			if(params[0]=="P" && sn.sen[wnum-2].pos==key){
				return true;
			}
			if(params[0]=="L" && sn.sen[wnum-2].lex==key){
				return true;
			}
		}
	}
	return false;
}

function findByContextNext(sn,wnum,param,key){
	params = param.split("+");
	if(params[1]=="1"){
		if (wnum+1<sn.sen.length){
			if(params[0]=="W" && sn.sen[wnum+1].sform==key){
				return true;
			}
			if(params[0]=="P" && sn.sen[wnum+1].pos==key){
				return true;
			}
			if(params[0]=="L" && sn.sen[wnum+1].lex==key){
				return true;
			}
		}
	}
	if(params[1]=="2"){
		if (wnum+2<sn.sen.length){
			if(params[0]=="W" && sn.sen[wnum+2].sform==key){
				return true;
			}
			if(params[0]=="P" && sn.sen[wnum+2].pos==key){
				return true;
			}
			if(params[0]=="L" && sn.sen[wnum+2].lex==key){
				return true;
			}
		}
	}
	return false;
}

function countContextElement(sn,wn,param){
	var wnum = parseInt(wn);
	var params = param.split("+");
	if(params.length==2){
		if(params[1]=="1"){
			if (wnum+1<sn.sen.length){
				if(params[0]=="W"){
					return sn.sen[wnum+1].sform;
				}
				if(params[0]=="P"){
					return sn.sen[wnum+1].pos;
				}
				if(params[0]=="L"){
					return sn.sen[wnum+1].lex;
				}
			}
		}
		if(params[1]=="2"){
			if (wnum+2<sn.sen.length){
				if(params[0]=="W"){
					return sn.sen[wnum+2].sform;
				}
				if(params[0]=="P"){
					return sn.sen[wnum+2].pos;
				}
				if(params[0]=="L"){
					return sn.sen[wnum+2].lex;
				}
			}
		}
	}
	params = param.split("_");
	//alert(params);
	if(params.length==2){
		if(params[1]=="1"){
			if (wnum-1>-1){
				if(params[0]=="W"){
					//alert(sn.sen[wnum-1].sform);
					return sn.sen[wnum-1].sform;
				}
				if(params[0]=="P"){
					return sn.sen[wnum-1].pos;
				}
				if(params[0]=="L"){
					return sn.sen[wnum-1].lex;
				}
			}
		}
		if(params[1]=="2"){
			if (wnum-2>-1){
				if(params[0]=="W"){
					return sn.sen[wnum-2].sform;
				}
				if(params[0]=="P"){
					return sn.sen[wnum-2].pos;
				}
				if(params[0]=="L"){
					return sn.sen[wnum-2].lex;
				}
			}
		}
	}
	return;
}

function searchInResult(arr_res, param, b){
	var result = {};
	var matches = {};
	var stat = {};
	//Keyword is "SENNUM_WORDNUM"
	if (b.length>0){
		for (kw in arr_res){
			var sn = arr_res[kw];
			var kwd = kw.split("_");
			
			var wd = sn.sen[kwd[1]];
			sfm = wd.sform;
			ps = wd.pos;
			lx = wd.lex;
			ss = wd.sens;
			if (param=="W"){
				if (sfm==b){
					matches[kw]=sn;
				}
			}else if(param=="P"){
				if (ps==b){
					matches[kw]=sn;
				}
			}else if(param=="L"){
				if (lx==b){
					matches[kw]=sn;
				}
			}else if(param=="W+1"|param=="W+2"|param=="P+1"|param=="P+2"||param=="L+1"|param=="L+2"){
				var cxt1 = findByContextNext(sn,parseInt(kwd[1]),param,b);
				if (cxt1){
					matches[kw]=sn;
				}
			}else if(param=="W-1"|param=="W-2"|param=="P-1"|param=="P-2"||param=="L-1"|param=="L-2"){
				var cxt1 = findByContextPrev(sn,parseInt(kwd[1]),param,b);
				if (cxt1){
					matches[kw]=sn;
				}
			}else if(param=="S"){
				if (ss==b){
					matches[kw]=sn;
				}
			}
		}
		stat[b] = Object.keys(matches).length;
	}else{
		for (kw in arr_res){
			var sn = arr_res[kw];
			var kwd = kw.split("_");
			
			var wd = sn.sen[kwd[1]];
			sfm = wd.sform;
			ps = wd.pos;
			lx = wd.lex;
			ss = wd.sens;
			if (param=="W"){
				if (sfm in stat){
					stat[sfm] = stat[sfm]+1;
				}else{
					stat[sfm] = 1;
				}
			}else if(param=="P"){
				if (ps in stat){
					stat[ps] = stat[ps]+1;
				}else{
					stat[ps] = 1;
				}
			}else if(param=="S"){
				if (ss in stat){
					stat[ss] = stat[ss]+1;
				}else{
					stat[ss] = 1;
				}
			}else if(param=="L"){
				if (lx in stat){
					stat[lx] = stat[lx]+1;
				}else{
					stat[lx] = 1;
				}
			}else if(param=="W+1"|param=="W+2"|param=="P+1"|param=="P+2"||param=="L+1"|param=="L+2"|param=="W-1"|param=="W-2"|param=="P-1"|param=="P-2"||param=="L-1"|param=="L-2"){
				var cxt = countContextElement(sn,kwd[1],param)
				if (cxt){
					if (cxt in stat){
						stat[cxt] = stat[cxt]+1;
					}else{
						stat[cxt] = 1;
					}
				}
			}
		}
		matches = arr_res;
		if(Object.keys(matches)==0){
			stat[b] = Object.keys(matches).length;
		}
	}
	result["result"] = matches;
	result["stat"] = stat;
	return result;
}


//1.2 Search list of match result by keyword and POS.
function searchLex(arr,b,p,l){
	var matches = {};
	for (i=0;i<arr.sents.length;i++){
		var sn = arr.sents[i];
		for(j=0;j<sn.sen.length;j++){
			var wd = sn.sen[j];
			sfm = wd.sform;
			ps = wd.pos;
			lx = wd.lex;
			if (sfm==b && ps==p && lx==l){
				matches[i.toString()+"_"+j.toString()]=arr.sents[i];
			}
		}
	}
	return matches;
}
//1.2 Search list of match result by keyword and POS.
function searchSense(arr,b,l,s){
	var matches = {};
	for (i=0;i<arr.sents.length;i++){
		var sn = arr.sents[i];
		for(j=0;j<sn.sen.length;j++){
			var wd = sn.sen[j];
			sfm = wd.sform;
			lx = wd.lex;
			ss = wd.sens;
			if (sfm==b && lx==l && ss==s){
				matches[i.toString()+"_"+j.toString()]=arr.sents[i];
			}
		}
	}
	return matches;
}

//2. Present Sentence 
// {"10_10:"문장",...}
function getSen(arg){
	var senz ={};
	for (k in arg){
		var words = "";
		var sn = arg[k];
		for (i=0;i<sn.sen.length;i++){
			var wd = sn.sen[i];
			var sfm = wd.sform;
			words = words+" "+sfm;
		}
		senz[k] = words;
	}
	return senz;
}

//3. get concordance
// {"10_10:"C-2 C-1 C C+1 C+2",...}

function getConc(searchResult,c){
	var concs ={};
	for (k in searchResult){
		var pair = {};
		var words = [];
		var poz = [];
		var lex = [];
		var sn = searchResult[k];
		var numz = k.split("_");
		var snum = numz[0];
		var wnum = parseInt(numz[1]);
		var sidx = wnum - c;
		var eidx = wnum + c;
		for (i=sidx;i<eidx+1;i++){
			var wd;
			var sfm;
			var pos;
			var lx;
			if (i>-1 && i<sn.sen.length){
					wd = sn.sen[i];
					sfm = wd.sform;
					pos = wd.pos;
					lx = wd.pos;
			}else{
					sfm = "__";
					pos = "__"
					lx = "__"
			}
			words.push(sfm);
			poz.push(pos);
			lex.push(sfm);
		}
		pair["word"] = words;
		pair["pos"] = poz;
		pair["lex"] = lex;
		
		concs[k] = pair;
	}
	return concs;
}

//4. Statistics of Corpus.
//
function getStat(arr){
	var stat = {}
	// # of Sentences
	var sCnt = 0;
	// # of Word Groups
	var wgCnt = {};
	// # of All Word Tokens.
	var wCnt = 0;
	// # of Word tokens per lexeme --> POS_Word type.
	var wdz = {};
	// # of POS tags per word types.
	var poz = {};
	// # of Lexemes for Disambiguation - Word Sform --> POS --> Lexmeme 
	var lexicon = {};
	for (i=0;i<arr.sents.length;i++){
		var sn = arr.sents[i];
		for (j=0;j<sn.sen.length;j++){
			
			var wd = sn.sen[j];
			var sfm = wd.sform;
			var pos = wd.pos;
			var lex = wd.lex;
			var ss = wd.lex;
			if (lex in wgCnt){
				wgCnt[lex] = wgCnt[lex]+1;
			}else{
				wgCnt[lex] = 1;
			}
			if (pos in poz){
				poz[pos] = poz[pos]+1;
			}else{
				poz[pos] = 1;
			}
			//alert(sfm);
			if (sfm in lexicon){
				var sf = lexicon[sfm];
				if (pos in sf){
					var pz = sf[pos];
					if (lex in pz){
						//alert(lex);
						pz[lex] = pz[lex]+1;
					}else{
						pz[lex] = 1;
					}
					sf[pos] = pz;
				}else{
					var pz = {};
					pz[lex] = 1;
					sf[pos] = pz;
				}
				lexicon[sfm] = sf;	
			}else{
				var pz = {};
				var sf = {};
				pz[lex] = 1;
				sf[pos] = pz;
				lexicon[sfm] = sf;
			}
			var key = pos+" "+sfm;
			if (lex in wdz){
				var lx = wdz[lex];
				if (key in lx){
					lx[key] = lx[key]+1
				}else{
					lx[key] = 1;
				}
				wdz[lex] = lx;
			}else{
				var lx = {};
				lx[key] = 1;
				wdz[lex] = lx;
			}


			wCnt = wCnt + 1;

		}
		sCnt = sCnt + 1;
	}

	stat["sCnt"] = sCnt;
	stat["wCnt"] = wCnt;
	//stat["wgcnt"] = wgCnt;
	stat["POS"] = poz;
	stat["lemma"] = wgCnt;//wdz;
	stat["lexicon"] = lexicon;
	//alert(stat["lexicon"]);
	return stat;
}

function getStatBysform(stat,sfm){
	//var ohash = makeOrderedHash();
	var ohash = {}; 
	var lexemes = [];
	var counts = [];
	var lexicon = stat["lexicon"];
	if (sfm in lexicon){
		var wdz = lexicon[sfm];
		for (p in wdz){
			var pos = wdz[p];
			for (l in pos){

				//ohash[p+","+l] = lexes[l];
				lexemes.push(p+" "+l);
				counts.push(pos[l]);
			}
		}
	}
	for (k in ohash){
		lexemes.push(k);
		counts.push(ohash[k]);
	}
	var out = {};
	out["lexemes"] = lexemes;
	out["counts"] = counts;
	return out;
}

function getStatByLex(arr,idz,sfm){
	var kzz = idz.split("_");
	var wd = arr.sents[parseInt(kzz[0])].sen[parseInt(kzz[1])]
	var lex = wd.lex;
	var ss = wd.sens;
	var scheme = {};
	if(sfm){
		scheme["W"] = sfm;
	}
	scheme["L"] = lex;
	scheme["S"] = "";

	var sch_res = searchByPattern(arr,scheme);

	return sch_res;
}

function getStatByPOS(arr,idz,pos){
	var kzz = idz.split("_");
	var wd = arr.sents[parseInt(kzz[0])].sen[parseInt(kzz[1])]
	var lex = wd.lex;
	var ss = wd.sens;
	var scheme = {};
	if(sfm){
		scheme["P"] = pos;
	}
	scheme["L"] = lex;
	scheme["S"] = "";

	var sch_res = searchByPattern(arr,scheme);

	return sch_res;
}

//Parse Pattern. 
function parsePattern(patt){
	var scheme = {};
	var hand = patt.split("->");
	if(hand){
		if(hand.length==2){
			var cond = hand[1].split(",");
			if(cond.length==1){
				change = cond[0].split(":");
				if(change.length==2){
					if(change[0]=="P"){
						scheme["INST_P"] = change[1];
						//alert(change[1]);
					}else if(change[0]=="W"){
						scheme["INST_W"] = change[1];
					}else if(change[0]=="L"){
						scheme["INST_L"] = change[1];
					}else{
						//alert("Ill-formed search pattern.", change);
						return;
					}	
				}else{
					//alert("Ill-formed search pattern.");
					return;
				}
			}else{
				//alert("Ill-formed search pattern.");
				return;
			}
		}
		if(hand[0]){//Just SEARCH.
			var cond = hand[0].split(",");
			for (i=0;i<cond.length;i++){
				// Check each Condition.
				if(cond[i]){
					var cnd = cond[i].split(":");
					if (cnd.length==2){
						scheme[cnd[0].trim()] = cnd[1].trim();
					}else{
						if(cond[i]=="S"|cond[i]=="W"|cond[i]=="P"|cond[i]=="L"|cond[i]=="W+1"|cond[i]=="P+1"|cond[i]=="L+1"|cond[i]=="W+2"|cond[i]=="P+2"|cond[i]=="L+2"){
							scheme[cond[i].trim()] = "";
						}else if(cond[i]=="W-1"|cond[i]=="P-1"|cond[i]=="L-1"|cond[i]=="W-2"|cond[i]=="P-2"|cond[i]=="L-2"){
							scheme[cond[i].trim()] = "";
						}
					}
				}else{
					//alert("Ill-formed search pattern.");
					//return null;
				}
			}
		}
	}
	return scheme;
}


function searchByPattern(arr,scheme){
	var sch_res = {};
	for (j in scheme){
		if("S"==j|"W"==j|"P"==j|"L"==j|"W+1"==j|"P+1"==j|"L+1"==j|"W-1"==j|"P-1"==j|"L-1"==j|"W+2"==j|"P+2"==j|"L+2"==j|"W-2"==j|"P-2"==j|"L-2"==j){
			
			if("result" in sch_res){
				sch_res = searchInResult(sch_res["result"],j,scheme[j]);
			}else{
				if("result" in arr){
					sch_res = searchInResult(arr["result"],j,scheme[j]);
				}else{
					sch_res = search(arr,j,scheme[j]);
				}
			}
		}
	}
	return sch_res;
}


function getStatByPattern(sch_arr){
	var lexemes = [];
	var counts = [];

	for (k in sch_arr){
		lexemes.push(k);
		counts.push(sch_arr[k]);
	}
	var out = {};
	out["lexemes"] = lexemes;
	out["counts"] = counts;
	return out;
}

function selectPOS(stat,op){

		oHash2 = getStatBysform(stat,op);
		var cntz = oHash["counts"];
		var lxmz = oHash["lexemes"];
		maxCnt = 0;
		maxPos = "";
		for(i=0;i<cntz.length;i++){
				if (cntz[i]>maxCnt){
						p_l = lxmz[i].split(" ");
						maxPos = p_l[0];
						maxLex = p_l[1];
						maxCnt = cntz[i];
				}
		}
		var out = [maxPos,maxLex]
		return out;
}


		function loadVngram() {
			var indice=["l"];
			var sequence=["l"];
			var request = new XMLHttpRequest();
			request.open("GET", "vngram2.json", false);
			request.send(null);
			vngram = JSON.parse(request.responseText);
			
			var request = new XMLHttpRequest();
			request.open("GET", "allVngramAddr.json", false);
			request.send(null);
			vngramAddr = JSON.parse(request.responseText);
			var request = new XMLHttpRequest();
			request.open("GET", "vind.json", false);
			request.send(null);
			vnindice = JSON.parse(request.responseText);
			 /* sequence array of all text to find variation n-grams */
			 for(i=0;i<newArr.sents.length;i++){
			 var kk = newArr.sents[i];
			 for(j=0;j<kk.sen.length;j++){
				 indice.push(i.toString()+"_"+j.toString());
					 sequence.push(kk.sen[j].sform);
				 }
			 }
			 indice.shift();
			 sequence.shift();
			var donCnt = 0;
			if(newArr){
			 for(i=0;i<vnindice.vidx.length;i++){
				 var position = vnindice.vidx[i].idx;
				 var vnwords = vnindice.vidx[i].wds;
				 var vnWdLength = vnwords.split(" ").length; 
				 var startIndex = indice.indexOf(position);
			 /*get index of variation string match*/
				 var iseq = indice.slice(startIndex,startIndex+vnWdLength);
			 /*POS key*/
				 var pkey = "";
			  /* making pos key complete: PO + Delimiter + CountNoun  = PO Delimiter CountNoun */
						 for (var ise in iseq){
							 var bb = iseq[ise].split("_");
							 var sn = parseInt(bb[0]);
							 var wn = parseInt(bb[1]);
							 var nk = newArr.sents[sn].sen[wn].pos;
					 /* give color number to color index dict */
					 /* pkey = "PO Delimiter" , poskeys key--> "CountNoun PN"*/
							colorIdx[iseq[ise]] = 1;
							}
				 donCnt = donCnt+1;
				 }
			}
			 updateColor();
			alert (donCnt+" Variation N-grams loaded!");
		   }


		   function findVngrams(keys){
			var div = document.getElementById('vnt');
	
			while(div.firstChild){
				div.removeChild(div.firstChild);
			}
			var fvtbl = document.createElement('TABLE');
			fvtbl.setAttribute("id","fvtbl");
			for ( k in keys){	
				var se = keys[k];
				var bb = se.split("_");
				var sn = parseInt(bb[0]);
				var wn = parseInt(bb[1]);
				if (sn < newArr.sents.length){
					var tr = document.createElement('TR');
					var sent = newArr.sents[sn].sen;
					var numtd = document.createElement('TD');
					var numbtn = document.createElement('BUTTON');
					numbtn.addEventListener("click", function(){
						var searchKey = this.textContent;
						setOneSentence(searchKey);	
					});
					
					numbtn.innerHTML = sn;
					numtd.appendChild(numbtn);
					tr.appendChild(numtd);
					for (si=wn-2;si<sent.length&&si<wn+keys.length+2;si++){
						if(si>-1){
							var wd = sent[si].sform;
							var pos = sent[si].pos;
							var td = document.createElement('TD');
							td.innerHTML = wd;
							tr.appendChild(td);
						}
					}
					var tr2 = document.createElement('TR');
					var xtd = document.createElement('TD');
					var xbtn = document.createElement('BUTTON');
					xtd.appendChild(xbtn);
					tr2.appendChild(xtd);
					for (si=wn-2;si<sent.length&&si<wn+keys.length+2;si++){
						if(si>-1){
							var pos = sent[si].pos;
							var td2 = document.createElement('TD');
							var btn = document.createElement('BUTTON');
							btn.innerHTML = pos;
							td2.appendChild(btn);
							tr2.appendChild(td2);
						}
					}
								   fvtbl.appendChild(tr);
								   fvtbl.appendChild(tr2);
				}
			}
				 var textcontent = document.getElementById("vnfind");
				 textcontent.appendChild(fvtbl);
		}
