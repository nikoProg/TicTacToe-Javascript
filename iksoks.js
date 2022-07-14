var tableArray = [null, null, null, null, null, null, null, null, null];
var tableHTMLArray = [null, null, null, null, null, null, null, null, null];
var existenceArray = [false, false, false, false, false, false, false, false, false];//nepotrebno izgleda
/*mozda je malo glupo sto je sve ovo niz i nije matrica, jer malo zbunjuje u kodu, ali
sam ja smislio matematicke puteve kroz niz kao +1 za vodoravno, +3 za uspravno, +4 za glavnu dijagonalu,
+2 za sporednu dijagonalu*/
//var winsX = 0, winsO = 0, ties = 0;
var wins1 = 0; wins2 = 0; ties = 0; matchNumber = -1;
//var current1 = "(X)"; current2 = "(O)"; 
var switchCurrent = "";
var gameOverFalse = true;
var turn = 0;//da li mozemo da ogranicimo turn na 9 i da vraca error ako je 9 ili vise?
document.getElementById("current2").textContent = "(X)";
document.getElementById("current1").textContent = "(O)";

document.getElementById("player1NameInput").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById("player1Name").textContent = player1NameInput.value;
    }
});
document.getElementById("player2NameInput").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById("player2Name").textContent = player2NameInput.value;
    }
});


function clearTable(){
    tableArray = [null, null, null, null, null, null, null, null, null];
}
clearTable();
tableHTMLArray[0] = document.getElementById("0");
tableHTMLArray[1] = document.getElementById("1");
tableHTMLArray[2] = document.getElementById("2");
tableHTMLArray[3] = document.getElementById("3");
tableHTMLArray[4] = document.getElementById("4");
tableHTMLArray[5] = document.getElementById("5");
tableHTMLArray[6] = document.getElementById("6");
tableHTMLArray[7] = document.getElementById("7");
tableHTMLArray[8] = document.getElementById("8");



function display(){
    //Sta kad  bi prosledio parametar koji je koordinata i on bi upisao samo tu 1 vrednost umesto sve?!
    //for(let i=0; i>9; i++){
        tableHTMLArray[0].textContent = tableArray[0];
        tableHTMLArray[1].textContent = tableArray[1];
        tableHTMLArray[2].textContent = tableArray[2];
        tableHTMLArray[3].textContent = tableArray[3];
        tableHTMLArray[4].textContent = tableArray[4];
        tableHTMLArray[5].textContent = tableArray[5];
        tableHTMLArray[6].textContent = tableArray[6];
        tableHTMLArray[7].textContent = tableArray[7];
        tableHTMLArray[8].textContent = tableArray[8];
        // }
}
//ideja promenjena u ovu, svako dugme pita turn da li je vreme za iks ili oks.
for(let i=0; i<9; i++){
    tableHTMLArray[i].addEventListener("click", function(){
        if(gameOverFalse){//hteo sam da obrisem ceo event listener ali nisam umeo, pa sam stavio ovaj uslov!
            write(i);
            if(turn > 4){
                winChecker(i);
            }
            console.log(turn);
        }
    })
}
function refresher(){
    matchNumber++;
    console.log("matchNumber#" + matchNumber);
    console.log(matchNumber % 2);
    turn = 0;
    clearTable();
    display();
    //DA LI OVDE TREBA DA SE UVEDE PROMENLJiVA ZA ELEMENT iLI JE OVO OKEJ?
    document.getElementById("player1Score").textContent = wins1;
    document.getElementById("player2Score").textContent = wins2;

    //ovo menja igraca koji je X ili O posle svake partije, samo prikaz, ne funkcionalnost
    switchCurrent = document.getElementById("current2").textContent;
    document.getElementById("current2").textContent = document.getElementById("current1").textContent;
    document.getElementById("current1").textContent = switchCurrent;

    gameOverFalse = true;
    document.getElementById("nextGame").style.display = "none";
    var index = 0;
    /* tableHTMLArray.forEach(function(index){
        tableHTMLArray[index].classList.remove("winner");
        index++;
    }); */
    for(let i=0; i<tableHTMLArray.length; i++){
        tableHTMLArray[i].classList.remove("winner");
    }
    alert("X and O should switch places, X always goes first!");
}
refresher();
document.getElementById("nextGame").addEventListener("click", function(){refresher();});
//NAJBITNIJE PITANJE! ZASTO NE MOZE DIREKTNO REFRESHER? UOPSTE NE RADI POSLE PRVOG POZIVA!!!
function xWins(){
    if(matchNumber % 2){//otkrio sam da pitam da li je TRUE ili FALSE a ne deljivo!!! i dalje radi samo ne bas kako treba
        wins2++;
    } else{
        wins1++;
    }
    console.log("X wins");
    gameOverFalse = false;
}
function oWins(){
    if(matchNumber % 2){
        wins1++;
    } else{
        wins2++;
    }
    console.log("O wins");
    gameOverFalse = false;
}
function write(counter){
    if(tableArray[counter] != "X" && tableArray[counter] != "O"){//uslov mozemo da pogledamo ponovo?
        if(turn % 2 == 0){
            tableArray[counter] = "X";
            turn = turn+1;
            display();
            console.log(tableArray);
            
        } else{
            tableArray[counter] = "O";
            turn = turn+1;
            display();
            console.log(tableArray);
        }
    }
//ovde je bila ideja da uradim removeEventListener i tako kompletno unistim dugme sve do sledece partije!
}

/*if(tableHTMLArray[0].textContent != " " &&
tableHTMLArray[1].textContent != " " &&
tableHTMLArray[2].textContent != " " &&
tableHTMLArray[3].textContent != " " &&
tableHTMLArray[4].textContent != " " && 
tableHTMLArray[5].textContent != " " &&
tableHTMLArray[6].textContent != " " &&
tableHTMLArray[7].textContent != " " &&
tableHTMLArray[8].textContent != " "){
    for(let i=0; i<9; i++){
        tableHTMLArray[i].textContent = " ";
    }
}*/

//WIN CONDITIONS:
//existence array - you don't want to check anything on places which are false! QUESTIONABLE!!! 
//imao sam neku ideju sa flagovima, gde se stvaraju objekti ili promenljive koje prosto postoje i one se samo pitaju "sta je oko mene? u 8 smera" ali onda nisam umeo da implementiram bas. Ovo bi bilo korisno u igrama koje imaju vise polja!
function winChecker(counter){
    existenceArray[counter] = true;
    console.log(existenceArray);
    /* if(counter == 4){
        if(tableArray[counter] == tableArray[counter-4]){
            if(tableArray[counter-4] == tableArray[counter+4]){
                if(tableArray[counter] == "X"){
                    alert("X wins!!!");
                }
            }
        }
    } */
    //if(turn > 4){
        for(let horizontalShift=0; horizontalShift<7; horizontalShift=horizontalShift+3){
            if(tableArray[horizontalShift]){
                if(tableArray[horizontalShift] == tableArray[horizontalShift+1]){   
                    if(tableArray[horizontalShift] == tableArray[horizontalShift+2]){
                        //boja za pobednika :) izvinjavam se sto nije odvojena funkcija
                        tableHTMLArray[horizontalShift].classList.add("winner");
                        tableHTMLArray[horizontalShift+1].classList.add("winner");
                        tableHTMLArray[horizontalShift+2].classList.add("winner");
                        if(tableArray[horizontalShift] == "X"){
                            xWins();
                            //alert("X horizontal win! " + "X won " + winsX + " times.");
                            document.getElementById("nextGame").style.display = "block";
                        } else{
                            oWins();
                            //alert("O horizontal win! " + "O won " + winsO + " times.");
                            document.getElementById("nextGame").style.display = "block";
                        }
                    }
                }
            }
        }
        for(let verticalShift=0; verticalShift<3; verticalShift++){
            if(tableArray[verticalShift]){
                if(tableArray[verticalShift] == tableArray[verticalShift+3]){   
                    if(tableArray[verticalShift] == tableArray[verticalShift+6]){
                        //boja za pobednika :) izvinjavam se sto nije odvojena funkcija
                        tableHTMLArray[verticalShift].classList.add("winner");
                        tableHTMLArray[verticalShift+3].classList.add("winner");
                        tableHTMLArray[verticalShift+6].classList.add("winner");                        
                        if(tableArray[verticalShift] == "X"){
                            xWins();   
                            //alert("X vertical win! " + "X won " + winsX + " times.");
                            document.getElementById("nextGame").style.display = "block";
                        } else{
                            oWins();
                            //alert("O vertical win! " + "O won " + winsO + " times.");
                            document.getElementById("nextGame").style.display = "block";
                        }
                    }
                }
            }
        }
        if(tableArray[0]){
            if(tableArray[0] == tableArray[4]){
                if(tableArray[4] == tableArray[8]){
                    //boja za pobednika :) izvinjavam se sto nije odvojena funkcija
                    tableHTMLArray[0].classList.add("winner");
                    tableHTMLArray[4].classList.add("winner");
                    tableHTMLArray[8].classList.add("winner");                    
                    if(tableArray[0] == "X"){
                        xWins();   
                        //alert("X diagonal 1 win! " + "X won " + winsX + " times.");
                        document.getElementById("nextGame").style.display = "block";
                    } else{
                        oWins();
                        //alert("O diagonal 1 win! " + "O won " + winsO + " times.");
                        document.getElementById("nextGame").style.display = "block";
                    }
                }
            }
        }
        if(tableArray[2]){
            if(tableArray[2] == tableArray[4]){
                if(tableArray[4] == tableArray[6]){
                    tableHTMLArray[2].classList.add("winner");
                    tableHTMLArray[4].classList.add("winner");
                    tableHTMLArray[6].classList.add("winner"); 
                    if(tableArray[2] == "X"){
                        xWins();    
                        //alert("X diagonal 2 win! " + "X won " + winsX + " times.");
                        document.getElementById("nextGame").style.display = "block";
                    } else{
                        oWins();
                        //alert("O diagonal 2 win! " + "O won " + winsO + " times.");
                        document.getElementById("nextGame").style.display = "block";
                    }
                }
            }
        }
        if(turn>8 && gameOverFalse){
            //gameOverFalse je potreban jer je moguce da se pobedi i bude nereseno u isto vreme, posledica je to da oba igraca dobiju po jednu pobedu za tu neresenu partiju, a pobednik dobije JOS jednu, tako da on dobije 2 poena u jednoj partiji. Razlika ostaje ista, ali nije lepo.
            ties++;//ties se u trenutnoj verziji nigde ne ispisuje
            wins1++;
            wins2++;
            alert("Tie " + ties + " times.");
            document.getElementById("nextGame").style.display = "block";
            gameOverFalse = false;
        }
    //}
}