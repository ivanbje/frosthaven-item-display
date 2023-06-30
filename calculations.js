function init()
{
	//console.log("ff fix?:" + window.top.location.href)

	const queryString = getParentUrl();
	if(queryString.slice(1).length > 0)
	{
		try
		{
			inp = inputDecode(queryString.slice(1));
			//console.log("input: "+inp);
			document.getElementById("myText").value = inp;
			//console.log(document.getElementById("myText").value);
			calculate()
		}
		catch(err)
		{
			console.log(err)
		}
	}
}

function calculate() {
	

	var x = document.getElementById("myText").value;
	

  	const img = document.createElement("img");
  	document.getElementById("ilist").innerHTML = x;

  	//remove whitespace and add split on : or ;
  	x = x.replaceAll(" ","");
  	x = x.replaceAll(":",",");
  	x = x.replaceAll(";",",");

  	itemlist = x.split(",");
  	//console.log(itemlist);
  	urlext = inputEncode(itemlist);
	//console.log(urlext);
  	noi=0;


  	const queryString = window.location.search;
	//console.log(queryString);
 
  	identified = "";


  	var permalink = document.getElementById("permalink")
  	permalink.innerHTML = ''
	var plink = document.createElement("span");
	plink.innerHTML = "<br>permalink: https://ivanbje.itch.io/frosthaven-item-display?"+urlext+"<br><br>";
	//permalink.appendChild(plink);
	console.log("Desktop chrome permalink: https://ivanbje.itch.io/frosthaven-item-display?"+urlext)


  	var images = document.getElementById("images")
  	images.innerHTML = ''


	
	for(var i=0;i<itemlist.length;i++)
	{
		//find the correct image zz
		zz=0;
		if(itemlist[i].toString().indexOf('g') != -1) { gloomItem = true; } else { gloomItem = false; }

		itemArray = fhitemArray
		if(gloomItem) {itemArray = ghitemArray;}

		for(var j=0; j<itemArray.length; j++)
		{
			itemID = itemlist[i].toString().replaceAll("g","");
			if(itemArray[j].indexOf(itemID) != -1)
			{
				if(itemArray[j].indexOf('back') == -1)
				{
					zz=j;
					identified = identified + itemlist[i]+", ";
					noi++;
					break; 
				}
			}
		}

		//display image zz
		const img = document.createElement("img");
		if(gloomItem)
		{
			img.src = 'gloomItems/'+itemArray[zz];
		}
		else
		{
			img.src = 'items/'+itemArray[zz];
		}
		const title = document.createElement("p")
		title.innerHTML = "Item "+itemlist[i];

		const imgdiv = document.createElement("div")
		imgdiv.appendChild(title);
		imgdiv.appendChild(img);

		images.appendChild(imgdiv);
	}

	


	document.getElementById("ilist").innerHTML = identified.toString();
	document.getElementById("ilength").innerHTML = noi;

}



var isNumber = function isNumber(value) {
  return typeof value === 'number' && isFinite(value);
}








function getParentUrl() {
    var isInIframe = (parent !== window),
        parentUrl = null;


    if (isInIframe) {
   		//console.log("original url: "+document.referrer);
        parentUrl = document.referrer.replaceAll("https://ivanbje.itch.io/frosthaven-item-display","");
    }
    else
    {
    	parentUrl = window.location.search;
    }

    return parentUrl;
}


function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}






function inputEncode(array)
{
	res=""
	for(var i=0;i<array.length;i++)
	{
		if(array[i].isNumber())
		{
			res = res + Number(array[i]).toString(18).padStart(2,0)
			//console.log("path 1"+ Number(array[i]).toString(18).padStart(2,0));
		}
		else if (array[i].replaceAll("g","").isNumber())
		{
			res = res + "p" + Number(array[i].replaceAll("g","")).toString(18).padStart(2,0)
			//console.log("p" + Number(array[i].replaceAll("g","")).toString(18).padStart(2,0))
		}
		else
		{
			res = res + array[i].toUpperCase();
			//console.log(array[i].toUpperCase())
		}
	}

	return res;
}

function inputDecode(string)
{
	res="";
	i=0;

	if(containsUppercase(string[i]))
	{
		wasCharacter = true;
	}
	else
	{
		wasCharacter = false;
	}

	

	while(i<string.length)
	{
		if(containsUppercase(string[i]))
		{
			isCharacter = true;
		}
		else
		{
			isCharacter = false;
		}

		if(isCharacter!=wasCharacter)
		{
			res = res + ",";
		}

		if(isCharacter)
		{
			res = res + string[i];
			i +=1;
		}
		else if(string[i] == "p")
		{
			res = res + "g" + parseInt(string[i+1]+string[i+2], 18).toString().padStart(3,0);
			i+=3;
		}
		else
		{
			res = res + parseInt(string[i]+string[i+1], 18).toString().padStart(3,0);
			i+=2;
		}

		
	}




	return res;
}




function containsUppercase(str) {
  return /[A-Z]/.test(str);
}
String.prototype.isNumber = function(){return /^\d+$/.test(this);}































var ghitemArray = ['gh-001-boots-of-striding-back.png','gh-001-boots-of-striding.png','gh-002-winged-shoes-back.png','gh-002-winged-shoes.png','gh-003-hide-armor-back.png','gh-003-hide-armor.png','gh-004-leather-armor-back.png','gh-004-leather-armor.png','gh-005-cloak-of-invisibility-back.png','gh-005-cloak-of-invisibility.png','gh-006-eagle-eye-goggles-back.png','gh-006-eagle-eye-goggles.png','gh-007-iron-helmet-back.png','gh-007-iron-helmet.png','gh-008-heater-shield-back.png','gh-008-heater-shield.png','gh-009-piercing-bow-back.png','gh-009-piercing-bow.png','gh-010-war-hammer-back.png','gh-010-war-hammer.png','gh-011-poison-dagger-back.png','gh-011-poison-dagger.png','gh-012-minor-healing-potion-back.png','gh-012-minor-healing-potion.png','gh-013-minor-stamina-potion-back.png','gh-013-minor-stamina-potion.png','gh-014-minor-power-potion-back.png','gh-014-minor-power-potion.png','gh-015-boots-of-speed-back.png','gh-015-boots-of-speed.png','gh-016-cloak-of-pockets-back.png','gh-016-cloak-of-pockets.png','gh-017-empowering-talisman-back.png','gh-017-empowering-talisman.png','gh-018-battle-axe-back.png','gh-018-battle-axe.png','gh-019-weighted-net-back.png','gh-019-weighted-net.png','gh-020-minor-mana-potion-back.png','gh-020-minor-mana-potion.png','gh-021-stun-powder-back.png','gh-021-stun-powder.png','gh-022-heavy-greaves-back.png','gh-022-heavy-greaves.png','gh-023-chainmail-back.png','gh-023-chainmail.png','gh-024-amulet-of-life-back.png','gh-024-amulet-of-life.png','gh-025-jagged-sword-back.png','gh-025-jagged-sword.png','gh-026-long-spear-back.png','gh-026-long-spear.png','gh-027-major-healing-potion-back.png','gh-027-major-healing-potion.png','gh-028-moon-earring-back.png','gh-028-moon-earring.png','gh-029-comfortable-shoes-back.png','gh-029-comfortable-shoes.png','gh-030-studded-leather-back.png','gh-030-studded-leather.png','gh-031-hawk-helm-back.png','gh-031-hawk-helm.png','gh-032-tower-shield-back.png','gh-032-tower-shield.png','gh-033-volatile-bomb-back.png','gh-033-volatile-bomb.png','gh-034-major-stamina-potion-back.png','gh-034-major-stamina-potion.png','gh-035-falcon-figurine-back.png','gh-035-falcon-figurine.png','gh-036-boots-of-dashing-back.png','gh-036-boots-of-dashing.png','gh-037-robes-of-evocation-back.png','gh-037-robes-of-evocation.png','gh-038-heavy-basinet-back.png','gh-038-heavy-basinet.png','gh-039-hooked-chain-back.png','gh-039-hooked-chain.png','gh-040-versatile-dagger-back.png','gh-040-versatile-dagger.png','gh-041-major-power-potion-back.png','gh-041-major-power-potion.png','gh-042-ring-of-haste-back.png','gh-042-ring-of-haste.png','gh-043-boots-of-quickness-back.png','gh-043-boots-of-quickness.png','gh-044-splintmail-back.png','gh-044-splintmail.png','gh-045-pendant-of-dark-pacts-back.png','gh-045-pendant-of-dark-pacts.png','gh-046-spiked-shield-back.png','gh-046-spiked-shield.png','gh-047-reaping-scythe-back.png','gh-047-reaping-scythe.png','gh-048-major-mana-potion-back.png','gh-048-major-mana-potion.png','gh-049-sun-earring-back.png','gh-049-sun-earring.png','gh-050-steel-sabatons-back.png','gh-050-steel-sabatons.png','gh-051-shadow-armor-back.png','gh-051-shadow-armor.png','gh-052-protective-charm-back.png','gh-052-protective-charm.png','gh-053-black-knife-back.png','gh-053-black-knife.png','gh-054-staff-of-eminence-back.png','gh-054-staff-of-eminence.png','gh-055-super-healing-potion-back.png','gh-055-super-healing-potion.png','gh-056-ring-of-brutality-back.png','gh-056-ring-of-brutality.png','gh-057-serene-sandals-back.png','gh-057-serene-sandals.png','gh-058-cloak-of-phasing-back.png','gh-058-cloak-of-phasing.png','gh-059-telescopic-lens-back.png','gh-059-telescopic-lens.png','gh-060-unstable-explosives-back.png','gh-060-unstable-explosives.png','gh-061-wall-shield-back.png','gh-061-wall-shield.png','gh-062-doom-powder-back.png','gh-062-doom-powder.png','gh-063-lucky-eye-back.png','gh-063-lucky-eye.png','gh-064-boots-of-sprinting-back.png','gh-064-boots-of-sprinting.png','gh-065-platemail-back.png','gh-065-platemail.png','gh-066-mask-of-terror-back.png','gh-066-mask-of-terror.png','gh-067-balanced-blade-back.png','gh-067-balanced-blade.png','gh-068-halberd-back.png','gh-068-halberd.png','gh-069-star-earring-back.png','gh-069-star-earring.png','gh-070-second-chance-ring-back.png','gh-070-second-chance-ring.png','gh-071a-boots-of-levitation-back.png','gh-071a-boots-of-levitation.png','gh-071b-boots-of-levitation-back.png','gh-071b-boots-of-levitation.png','gh-072a-shoes-of-happiness-back.png','gh-072a-shoes-of-happiness.png','gh-072b-shoes-of-happiness-back.png','gh-072b-shoes-of-happiness.png','gh-073a-blinking-cape-back.png','gh-073a-blinking-cape.png','gh-073b-blinking-cape-back.png','gh-073b-blinking-cape.png','gh-074a-swordedge-armor-back.png','gh-074a-swordedge-armor.png','gh-074b-swordedge-armor-back.png','gh-074b-swordedge-armor.png','gh-075a-circlet-of-elements-back.png','gh-075a-circlet-of-elements.png','gh-075b-circlet-of-elements-back.png','gh-075b-circlet-of-elements.png','gh-076a-chain-hood-back.png','gh-076a-chain-hood.png','gh-076b-chain-hood-back.png','gh-076b-chain-hood.png','gh-077a-frigid-blade-back.png','gh-077a-frigid-blade.png','gh-077b-frigid-blade-back.png','gh-077b-frigid-blade.png','gh-078a-storm-blade-back.png','gh-078a-storm-blade.png','gh-078b-storm-blade-back.png','gh-078b-storm-blade.png','gh-079a-inferno-blade-back.png','gh-079a-inferno-blade.png','gh-079b-inferno-blade-back.png','gh-079b-inferno-blade.png','gh-080a-tremor-blade-back.png','gh-080a-tremor-blade.png','gh-080b-tremor-blade-back.png','gh-080b-tremor-blade.png','gh-081a-brilliant-blade-back.png','gh-081a-brilliant-blade.png','gh-081b-brilliant-blade-back.png','gh-081b-brilliant-blade.png','gh-082a-night-blade-back.png','gh-082a-night-blade.png','gh-082b-night-blade-back.png','gh-082b-night-blade.png','gh-083a-wand-of-frost-back.png','gh-083a-wand-of-frost.png','gh-083b-wand-of-frost-back.png','gh-083b-wand-of-frost.png','gh-084a-wand-of-storms-back.png','gh-084a-wand-of-storms.png','gh-084b-wand-of-storms-back.png','gh-084b-wand-of-storms.png','gh-085a-wand-of-infernos-back.png','gh-085a-wand-of-infernos.png','gh-085b-wand-of-infernos-back.png','gh-085b-wand-of-infernos.png','gh-086a-wand-of-tremors-back.png','gh-086a-wand-of-tremors.png','gh-086b-wand-of-tremors-back.png','gh-086b-wand-of-tremors.png','gh-087a-wand-of-brilliance-back.png','gh-087a-wand-of-brilliance.png','gh-087b-wand-of-brilliance-back.png','gh-087b-wand-of-brilliance.png','gh-088a-wand-of-darkness-back.png','gh-088a-wand-of-darkness.png','gh-088b-wand-of-darkness-back.png','gh-088b-wand-of-darkness.png','gh-089a-minor-cure-potion-back.png','gh-089a-minor-cure-potion.png','gh-089b-minor-cure-potion-back.png','gh-089b-minor-cure-potion.png','gh-090a-major-cure-potion-back.png','gh-090a-major-cure-potion.png','gh-090b-major-cure-potion-back.png','gh-090b-major-cure-potion.png','gh-091a-steel-ring-back.png','gh-091a-steel-ring.png','gh-091b-steel-ring-back.png','gh-091b-steel-ring.png','gh-092a-dampening-ring-back.png','gh-092a-dampening-ring.png','gh-092b-dampening-ring-back.png','gh-092b-dampening-ring.png','gh-093a-scroll-of-power-back.png','gh-093a-scroll-of-power.png','gh-093b-scroll-of-power-back.png','gh-093b-scroll-of-power.png','gh-094a-scroll-of-healing-back.png','gh-094a-scroll-of-healing.png','gh-094b-scroll-of-healing-back.png','gh-094b-scroll-of-healing.png','gh-095a-scroll-of-stamina-back.png','gh-095a-scroll-of-stamina.png','gh-095b-scroll-of-stamina-back.png','gh-095b-scroll-of-stamina.png','gh-096-rocket-boots-back.png','gh-096-rocket-boots.png','gh-097-endurance-footwraps-back.png','gh-097-endurance-footwraps.png','gh-098-drakescale-boots-back.png','gh-098-drakescale-boots.png','gh-099-magma-waders-back.png','gh-099-magma-waders.png','gh-100-robes-of-summoning-back.png','gh-100-robes-of-summoning.png','gh-101-second-skin-back.png','gh-101-second-skin.png','gh-102-sacrificial-robes-back.png','gh-102-sacrificial-robes.png','gh-103-drakescale-armor-back.png','gh-103-drakescale-armor.png','gh-104-steam-armor-back.png','gh-104-steam-armor.png','gh-105-flea-bitten-shawl-back.png','gh-105-flea-bitten-shawl.png','gh-106-necklace-of-teeth-back.png','gh-106-necklace-of-teeth.png','gh-107-horned-helm-back.png','gh-107-horned-helm.png','gh-108-drakescale-helm-back.png','gh-108-drakescale-helm.png','gh-109-thiefs-hood-back.png','gh-109-thiefs-hood.png','gh-110-helm-of-the-mountain-back.png','gh-110-helm-of-the-mountain.png','gh-111-wave-crest-back.png','gh-111-wave-crest.png','gh-112-ancient-drill-back.png','gh-112-ancient-drill.png','gh-113-skullbane-axe-back.png','gh-113-skullbane-axe.png','gh-114-staff-of-xorn-back.png','gh-114-staff-of-xorn.png','gh-115-mountain-hammer-back.png','gh-115-mountain-hammer.png','gh-116-fueled-falchion-back.png','gh-116-fueled-falchion.png','gh-117-bloody-axe-back.png','gh-117-bloody-axe.png','gh-118-staff-of-elements-back.png','gh-118-staff-of-elements.png','gh-119-skull-of-hatred-back.png','gh-119-skull-of-hatred.png','gh-120-staff-of-summoning-back.png','gh-120-staff-of-summoning.png','gh-121-orb-of-dawn-back.png','gh-121-orb-of-dawn.png','gh-122-orb-of-twilight-back.png','gh-122-orb-of-twilight.png','gh-123-ring-of-skulls-back.png','gh-123-ring-of-skulls.png','gh-124-doomed-compass-back.png','gh-124-doomed-compass.png','gh-125-curious-gear-back.png','gh-125-curious-gear.png','gh-126-remote-spider-back.png','gh-126-remote-spider.png','gh-127-giant-remote-spider-back.png','gh-127-giant-remote-spider.png','gh-128-black-censer-back.png','gh-128-black-censer.png','gh-129-black-card-back.png','gh-129-black-card.png','gh-130-helix-ring-back.png','gh-130-helix-ring.png','gh-131-heart-of-the-betrayer-back.png','gh-131-heart-of-the-betrayer.png','gh-132-power-core-back.png','gh-132-power-core.png','gh-133-resonant-crystal-back.png','gh-133-resonant-crystal.png','gh-134-imposing-blade-back.png','gh-134-imposing-blade.png','gh-135-focusing-ray-back.png','gh-135-focusing-ray.png','gh-136-volatile-elixir-back.png','gh-136-volatile-elixir.png','gh-137-silent-stiletto-back.png','gh-137-silent-stiletto.png','gh-138-stone-charm-back.png','gh-138-stone-charm.png','gh-139-psychic-knife-back.png','gh-139-psychic-knife.png','gh-140-sun-shield-back.png','gh-140-sun-shield.png','gh-141-utility-belt-back.png','gh-141-utility-belt.png','gh-142-phasing-idol-back.png','gh-142-phasing-idol.png','gh-143-smoke-elixir-back.png','gh-143-smoke-elixir.png','gh-144-pendant-of-the-plague-back.png','gh-144-pendant-of-the-plague.png','gh-145-mask-of-death-back.png','gh-145-mask-of-death.png','gh-146-masters-lute-back.png','gh-146-masters-lute.png','gh-147-cloak-of-the-hunter-back.png','gh-147-cloak-of-the-hunter.png','gh-148-doctors-coat-back.png','gh-148-doctors-coat.png','gh-149-elemental-boots-back.png','gh-149-elemental-boots.png','gh-150-staff-of-command-back.png','gh-150-staff-of-command.png','gh-151-sword-of-the-sands-back.png','gh-151-sword-of-the-sands.png']
var fhitemArray = ['fh-001-spyglass-back.png','fh-001-spyglass.png','fh-002-crude-helmet-back.png','fh-002-crude-helmet.png','fh-003-traveling-cloak-back.png','fh-003-traveling-cloak.png','fh-004-crude-hide-armor-back.png','fh-004-crude-hide-armor.png','fh-005-crude-boots-back.png','fh-005-crude-boots.png','fh-006-flexible-slippers-back.png','fh-006-flexible-slippers.png','fh-007-crude-bow-back.png','fh-007-crude-bow.png','fh-008-crude-spear-back.png','fh-008-crude-spear.png','fh-009-protective-scepter-back.png','fh-009-protective-scepter.png','fh-010-crude-shield-back.png','fh-010-crude-shield.png','fh-011-simple-charm-back.png','fh-011-simple-charm.png','fh-012-crude-chain-armor-back.png','fh-012-crude-chain-armor.png','fh-013-dancing-slippers-back.png','fh-013-dancing-slippers.png','fh-014-heavy-sword-back.png','fh-014-heavy-sword.png','fh-015-reinforced-shield-back.png','fh-015-reinforced-shield.png','fh-016-inspiring-helmet-back.png','fh-016-inspiring-helmet.png','fh-017-cured-leather-armor-back.png','fh-017-cured-leather-armor.png','fh-018-rough-boots-back.png','fh-018-rough-boots.png','fh-019-ringing-hammer-back.png','fh-019-ringing-hammer.png','fh-020-well-strung-bow-back.png','fh-020-well-strung-bow.png','fh-021-chain-hood-back.png','fh-021-chain-hood.png','fh-022-heavy-chain-armor-back.png','fh-022-heavy-chain-armor.png','fh-023-sturdy-greaves-back.png','fh-023-sturdy-greaves.png','fh-024-corrupted-blade-back.png','fh-024-corrupted-blade.png','fh-025-soothing-scepter-back.png','fh-025-soothing-scepter.png','fh-026-truesight-lenses-back.png','fh-026-truesight-lenses.png','fh-027-cloak-of-warding-back.png','fh-027-cloak-of-warding.png','fh-028-sturdy-boots-back.png','fh-028-sturdy-boots.png','fh-029-cleaving-axe-back.png','fh-029-cleaving-axe.png','fh-030-parrying-gauntlet-back.png','fh-030-parrying-gauntlet.png','fh-031-deathproof-charm-back.png','fh-031-deathproof-charm.png','fh-032-shell-armor-back.png','fh-032-shell-armor.png','fh-033-volatile-boots-back.png','fh-033-volatile-boots.png','fh-034-shrapnel-bomb-back.png','fh-034-shrapnel-bomb.png','fh-035-kite-shield-back.png','fh-035-kite-shield.png','fh-036-plumed-helmet-back.png','fh-036-plumed-helmet.png','fh-037-ghost-cloak-back.png','fh-037-ghost-cloak.png','fh-038-duelists-shoes-back.png','fh-038-duelists-shoes.png','fh-039-abyss-axe-back.png','fh-039-abyss-axe.png','fh-040-heartstrike-bow-back.png','fh-040-heartstrike-bow.png','fh-041-intricate-charm-back.png','fh-041-intricate-charm.png','fh-042-ornate-armor-back.png','fh-042-ornate-armor.png','fh-043-kicking-boots-back.png','fh-043-kicking-boots.png','fh-044-sword-of-absolution-back.png','fh-044-sword-of-absolution.png','fh-045-master-scepter-back.png','fh-045-master-scepter.png','fh-046-double-lens-goggles-back.png','fh-046-double-lens-goggles.png','fh-047-robes-of-doom-back.png','fh-047-robes-of-doom.png','fh-048-living-shoes-back.png','fh-048-living-shoes.png','fh-049-cruel-dagger-back.png','fh-049-cruel-dagger.png','fh-050-shield-of-reciprocity-back.png','fh-050-shield-of-reciprocity.png','fh-051a-spiked-collar-back.png','fh-051a-spiked-collar.png','fh-051b-spiked-collar-back.png','fh-051b-spiked-collar.png','fh-052a-laser-lens-back.png','fh-052a-laser-lens.png','fh-052b-laser-lens-back.png','fh-052b-laser-lens.png','fh-053a-hobnail-boots-back.png','fh-053a-hobnail-boots.png','fh-053b-hobnail-boots-back.png','fh-053b-hobnail-boots.png','fh-054a-restful-slippers-back.png','fh-054a-restful-slippers.png','fh-054b-restful-slippers-back.png','fh-054b-restful-slippers.png','fh-055a-biting-gauntlet-back.png','fh-055a-biting-gauntlet.png','fh-055b-biting-gauntlet-back.png','fh-055b-biting-gauntlet.png','fh-056a-scavengers-magnet-back.png','fh-056a-scavengers-magnet.png','fh-056b-scavengers-magnet-back.png','fh-056b-scavengers-magnet.png','fh-057a-shovel-back.png','fh-057a-shovel.png','fh-057b-shovel-back.png','fh-057b-shovel.png','fh-058a-slippery-sword-back.png','fh-058a-slippery-sword.png','fh-058b-slippery-sword-back.png','fh-058b-slippery-sword.png','fh-059a-charm-of-expertise-back.png','fh-059a-charm-of-expertise.png','fh-059b-charm-of-expertise-back.png','fh-059b-charm-of-expertise.png','fh-060a-cloak-of-many-pockets-back.png','fh-060a-cloak-of-many-pockets.png','fh-060b-cloak-of-many-pockets-back.png','fh-060b-cloak-of-many-pockets.png','fh-061a-spiked-shell-back.png','fh-061a-spiked-shell.png','fh-061b-spiked-shell-back.png','fh-061b-spiked-shell.png','fh-062a-everlasting-boots-back.png','fh-062a-everlasting-boots.png','fh-062b-everlasting-boots-back.png','fh-062b-everlasting-boots.png','fh-063a-shadow-stompers-back.png','fh-063a-shadow-stompers.png','fh-063b-shadow-stompers-back.png','fh-063b-shadow-stompers.png','fh-064a-detonator-back.png','fh-064a-detonator.png','fh-064b-detonator-back.png','fh-064b-detonator.png','fh-065a-rust-powder-back.png','fh-065a-rust-powder.png','fh-065b-rust-powder-back.png','fh-065b-rust-powder.png','fh-066-amulet-of-eternal-life-back.png','fh-066-amulet-of-eternal-life.png','fh-067-converging-lenses-back.png','fh-067-converging-lenses.png','fh-068-scaled-armor-back.png','fh-068-scaled-armor.png','fh-069-feathered-cloak-back.png','fh-069-feathered-cloak.png','fh-070-aesther-robe-back.png','fh-070-aesther-robe.png','fh-071-bone-boots-back.png','fh-071-bone-boots.png','fh-072-oak-staff-back.png','fh-072-oak-staff.png','fh-073-energizing-baton-back.png','fh-073-energizing-baton.png','fh-074-shock-grenades-back.png','fh-074-shock-grenades.png','fh-075-rose-gauntlet-back.png','fh-075-rose-gauntlet.png','fh-076-horn-of-command-back.png','fh-076-horn-of-command.png','fh-077-chaos-cannon-back.png','fh-077-chaos-cannon.png','fh-078-balanced-scales-back.png','fh-078-balanced-scales.png','fh-079-roasted-fowl-back.png','fh-079-roasted-fowl.png','fh-080-living-stone-back.png','fh-080-living-stone.png','fh-081-pain-simulacrum-back.png','fh-081-pain-simulacrum.png','fh-082-mechanical-cube-back.png','fh-082-mechanical-cube.png','fh-083-healing-potion-back.png','fh-083-healing-potion.png','fh-084-stamina-potion-back.png','fh-084-stamina-potion.png','fh-085-power-potion-back.png','fh-085-power-potion.png','fh-086-element-potion-back.png','fh-086-element-potion.png','fh-087-cure-potion-back.png','fh-087-cure-potion.png','fh-088-fireshield-potion-back.png','fh-088-fireshield-potion.png','fh-089-stoneskin-potion-back.png','fh-089-stoneskin-potion.png','fh-090-muscle-potion-back.png','fh-090-muscle-potion.png','fh-091-holy-water-back.png','fh-091-holy-water.png','fh-092-renewing-potion-back.png','fh-092-renewing-potion.png','fh-093-glancing-potion-back.png','fh-093-glancing-potion.png','fh-094-frenzy-potion-back.png','fh-094-frenzy-potion.png','fh-095-poison-vial-back.png','fh-095-poison-vial.png','fh-096-flame-vial-back.png','fh-096-flame-vial.png','fh-097-explosive-vial-back.png','fh-097-explosive-vial.png','fh-098-unhealthy-mixture-back.png','fh-098-unhealthy-mixture.png','fh-099-major-healing-potion-back.png','fh-099-major-healing-potion.png','fh-100-major-stamina-potion-back.png','fh-100-major-stamina-potion.png','fh-101-major-power-potion-back.png','fh-101-major-power-potion.png','fh-102-major-element-potion-back.png','fh-102-major-element-potion.png','fh-103-major-cure-potion-back.png','fh-103-major-cure-potion.png','fh-104-swiftness-potion-back.png','fh-104-swiftness-potion.png','fh-105-major-fireshield-potion-back.png','fh-105-major-fireshield-potion.png','fh-106-stonewall-potion-back.png','fh-106-stonewall-potion.png','fh-107-vigor-potion-back.png','fh-107-vigor-potion.png','fh-108-holy-rain-back.png','fh-108-holy-rain.png','fh-109-major-renewing-potion-back.png','fh-109-major-renewing-potion.png','fh-110-precision-potion-back.png','fh-110-precision-potion.png','fh-111-major-frenzy-potion-back.png','fh-111-major-frenzy-potion.png','fh-112-hammer-potion-back.png','fh-112-hammer-potion.png','fh-113-expertise-potion-back.png','fh-113-expertise-potion.png','fh-114-foresight-potion-back.png','fh-114-foresight-potion.png','fh-115-infusion-potion-back.png','fh-115-infusion-potion.png','fh-116-plague-flask-back.png','fh-116-plague-flask.png','fh-117-inferno-flask-back.png','fh-117-inferno-flask.png','fh-118-fulminant-flask-back.png','fh-118-fulminant-flask.png','fh-119-deadly-mixture-back.png','fh-119-deadly-mixture.png','fh-120-amulet-of-life-back.png','fh-120-amulet-of-life.png','fh-121-circlet-of-elements-back.png','fh-121-circlet-of-elements.png','fh-122-wardens-robes-back.png','fh-122-wardens-robes.png','fh-123-leather-armor-back.png','fh-123-leather-armor.png','fh-124-winged-shoes-back.png','fh-124-winged-shoes.png','fh-125-boots-of-speed-back.png','fh-125-boots-of-speed.png','fh-126-weighted-net-back.png','fh-126-weighted-net.png','fh-127-poison-dagger-back.png','fh-127-poison-dagger.png','fh-128-heater-shield-back.png','fh-128-heater-shield.png','fh-129-eagle-eye-goggles-back.png','fh-129-eagle-eye-goggles.png','fh-130-iron-helmet-back.png','fh-130-iron-helmet.png','fh-131-chainmail-back.png','fh-131-chainmail.png','fh-132-cloak-of-pockets-back.png','fh-132-cloak-of-pockets.png','fh-133-nimble-legguards-back.png','fh-133-nimble-legguards.png','fh-134-comfortable-shoes-back.png','fh-134-comfortable-shoes.png','fh-135-armorbane-bow-back.png','fh-135-armorbane-bow.png','fh-136-battle-axe-back.png','fh-136-battle-axe.png','fh-137-tower-shield-back.png','fh-137-tower-shield.png','fh-138-heavy-basinet-back.png','fh-138-heavy-basinet.png','fh-139-horned-helm-back.png','fh-139-horned-helm.png','fh-140-mantle-of-summoning-back.png','fh-140-mantle-of-summoning.png','fh-141-studded-leather-back.png','fh-141-studded-leather.png','fh-142-boots-of-quickness-back.png','fh-142-boots-of-quickness.png','fh-143-endurance-footwraps-back.png','fh-143-endurance-footwraps.png','fh-144-staff-of-eminence-back.png','fh-144-staff-of-eminence.png','fh-145-versatile-dagger-back.png','fh-145-versatile-dagger.png','fh-146-hooked-chain-back.png','fh-146-hooked-chain.png','fh-147-mask-of-terror-back.png','fh-147-mask-of-terror.png','fh-148-circlet-of-sanctity-back.png','fh-148-circlet-of-sanctity.png','fh-149-platemail-back.png','fh-149-platemail.png','fh-150-robes-of-the-oak-back.png','fh-150-robes-of-the-oak.png','fh-151-serene-sandals-back.png','fh-151-serene-sandals.png','fh-152-steel-sabatons-back.png','fh-152-steel-sabatons.png','fh-153-long-spear-back.png','fh-153-long-spear.png','fh-154-volatile-bomb-back.png','fh-154-volatile-bomb.png','fh-155-wall-shield-back.png','fh-155-wall-shield.png','fh-156-moon-earring-back.png','fh-156-moon-earring.png','fh-157-steel-ring-back.png','fh-157-steel-ring.png','fh-158-deep-earth-brooch-back.png','fh-158-deep-earth-brooch.png','fh-159-glorious-bracelet-back.png','fh-159-glorious-bracelet.png','fh-160-sun-earring-back.png','fh-160-sun-earring.png','fh-161-strategists-ring-back.png','fh-161-strategists-ring.png','fh-162-howling-ice-brooch-back.png','fh-162-howling-ice-brooch.png','fh-163-stunning-bracelet-back.png','fh-163-stunning-bracelet.png','fh-164-star-earring-back.png','fh-164-star-earring.png','fh-165-ring-of-haste-back.png','fh-165-ring-of-haste.png','fh-166-blazing-sun-brooch-back.png','fh-166-blazing-sun-brooch.png','fh-167-attractive-bracelet-back.png','fh-167-attractive-bracelet.png','fh-168-circlet-of-eyes-back.png','fh-168-circlet-of-eyes.png','fh-169-fateful-charm-back.png','fh-169-fateful-charm.png','fh-170-eye-of-truth-back.png','fh-170-eye-of-truth.png','fh-171-rejuvenating-charm-back.png','fh-171-rejuvenating-charm.png','fh-172-cap-of-premonition-back.png','fh-172-cap-of-premonition.png','fh-173-multi-colored-cloak-back.png','fh-173-multi-colored-cloak.png','fh-174-magnetic-cape-back.png','fh-174-magnetic-cape.png','fh-175-mirrored-armor-back.png','fh-175-mirrored-armor.png','fh-176-blinking-cape-back.png','fh-176-blinking-cape.png','fh-177-boots-of-transference-back.png','fh-177-boots-of-transference.png','fh-178-tranquil-shoes-back.png','fh-178-tranquil-shoes.png','fh-179-burst-boots-back.png','fh-179-burst-boots.png','fh-180-boots-of-greed-back.png','fh-180-boots-of-greed.png','fh-181-translocation-rod-back.png','fh-181-translocation-rod.png','fh-182-wing-clippers-back.png','fh-182-wing-clippers.png','fh-183-decanter-of-mists-back.png','fh-183-decanter-of-mists.png','fh-184-flashing-axe-back.png','fh-184-flashing-axe.png','fh-185-mirrored-knife-back.png','fh-185-mirrored-knife.png','fh-186-wild-growth-seeds-back.png','fh-186-wild-growth-seeds.png','fh-187-dangerous-gear-back.png','fh-187-dangerous-gear.png','fh-188-freezing-crystal-back.png','fh-188-freezing-crystal.png','fh-189-ring-of-the-night-back.png','fh-189-ring-of-the-night.png','fh-190-white-card-back.png','fh-190-white-card.png','fh-191-corrupted-scroll-back.png','fh-191-corrupted-scroll.png','fh-192-enticing-bell-back.png','fh-192-enticing-bell.png','fh-193-mind-thieving-helmet-back.png','fh-193-mind-thieving-helmet.png','fh-194-temporal-amulet-back.png','fh-194-temporal-amulet.png','fh-195-tri-corner-hat-back.png','fh-195-tri-corner-hat.png','fh-196-choker-of-sacrifice-back.png','fh-196-choker-of-sacrifice.png','fh-197-aesther-diadem-back.png','fh-197-aesther-diadem.png','fh-198-hunters-necklace-back.png','fh-198-hunters-necklace.png','fh-199-opulent-shoes-back.png','fh-199-opulent-shoes.png','fh-200-eventide-scepter-back.png','fh-200-eventide-scepter.png','fh-201-wave-blade-back.png','fh-201-wave-blade.png','fh-202-giant-piranha-pig-spine-back.png','fh-202-giant-piranha-pig-spine.png','fh-203-scepter-of-control-back.png','fh-203-scepter-of-control.png','fh-204-severed-claw-back.png','fh-204-severed-claw.png','fh-205-harpoon-back.png','fh-205-harpoon.png','fh-206-giant-sword-back.png','fh-206-giant-sword.png','fh-207-fishhook-back.png','fh-207-fishhook.png','fh-208-titan-nail-back.png','fh-208-titan-nail.png','fh-209-sword-of-mastery-back.png','fh-209-sword-of-mastery.png','fh-210-tanjo-back.png','fh-210-tanjo.png','fh-211-boom-barrel-back.png','fh-211-boom-barrel.png','fh-212-elemental-stone-back.png','fh-212-elemental-stone.png','fh-213-key-of-seasons-back.png','fh-213-key-of-seasons.png','fh-214-cup-of-ventillion-back.png','fh-214-cup-of-ventillion.png','fh-215-befuddling-mug-back.png','fh-215-befuddling-mug.png','fh-216-tome-of-elements-back.png','fh-216-tome-of-elements.png','fh-217-tome-of-time-back.png','fh-217-tome-of-time.png','fh-218-tome-of-life-back.png','fh-218-tome-of-life.png','fh-219-tome-of-conflict-back.png','fh-219-tome-of-conflict.png','fh-220-belaras-quill-back.png','fh-220-belaras-quill.png','fh-221-ice-shiv-back.png','fh-221-ice-shiv.png','fh-222-black-box-back.png','fh-222-black-box.png','fh-223-lightning-rod-back.png','fh-223-lightning-rod.png','fh-224-armor-of-empathy-back.png','fh-224-armor-of-empathy.png','fh-225-algox-carving-back.png','fh-225-algox-carving.png','fh-226-unfettered-arm-back.png','fh-226-unfettered-arm.png','fh-227-data-drive-back.png','fh-227-data-drive.png','fh-228-extendable-pole-back.png','fh-228-extendable-pole.png','fh-229-exquisite-map-back.png','fh-229-exquisite-map.png','fh-230-examination-glass-back.png','fh-230-examination-glass.png','fh-231-skinning-knife-back.png','fh-231-skinning-knife.png','fh-232-orchid-wand-back.png','fh-232-orchid-wand.png','fh-233-dead-raven-back.png','fh-233-dead-raven.png','fh-234-ooze-vial-back.png','fh-234-ooze-vial.png','fh-235-small-rat-back.png','fh-235-small-rat.png','fh-236-cracked-mirror-back.png','fh-236-cracked-mirror.png','fh-237-mesmerizing-seashell-back.png','fh-237-mesmerizing-seashell.png','fh-238-cracked-idol-back.png','fh-238-cracked-idol.png','fh-239-eye-of-the-storm-back.png','fh-239-eye-of-the-storm.png','fh-240-ilengthns-gem-back.png','fh-240-ilengthns-gem.png','fh-241-shimmering-powder-back.png','fh-241-shimmering-powder.png','fh-242-lucky-dice-back.png','fh-242-lucky-dice.png','fh-243-cursed-rock-back.png','fh-243-cursed-rock.png','fh-244-ember-energy-source-back.png','fh-244-ember-energy-source.png','fh-245a-ancient-coin-back.png','fh-245a-ancient-coin.png','fh-245b-ancient-coin-back.png','fh-245b-ancient-coin.png','fh-245c-ancient-coin-back.png','fh-245c-ancient-coin.png','fh-245d-ancient-coin-back.png','fh-245d-ancient-coin.png','fh-246-key-card-back.png','fh-246-key-card.png','fh-247-trainers-net-back.png','fh-247-trainers-net.png','fh-248-wanderers-club-back.png','fh-248-wanderers-club.png','fh-249-recalibration-trigger-back.png','fh-249-recalibration-trigger.png','fh-250-spear-of-justice-back.png','fh-250-spear-of-justice.png','fh-251-soul-urn-back.png','fh-251-soul-urn.png','fh-252-black-earth-codex-back.png','fh-252-black-earth-codex.png','fh-253-mask-of-duality-back.png','fh-253-mask-of-duality.png','fh-254-ancestral-blade-back.png','fh-254-ancestral-blade.png','fh-255-mountains-heart-back.png','fh-255-mountains-heart.png','fh-256-sonorous-shard-back.png','fh-256-sonorous-shard.png','fh-257-sly-camouflage-back.png','fh-257-sly-camouflage.png','fh-258-skull-of-agony-back.png','fh-258-skull-of-agony.png','fh-259-storm-carving-back.png','fh-259-storm-carving.png','fh-260-freezing-orb-back.png','fh-260-freezing-orb.png','fh-261-energized-module-back.png','fh-261-energized-module.png','fh-262-exhaust-boots-back.png','fh-262-exhaust-boots.png','fh-263-warlords-skull-back.png','fh-263-warlords-skull.png','fh-264-spiraled-medallion-back.png','fh-264-spiraled-medallion.png']























window.addEventListener('DOMContentLoaded', () => {
    init();
});
