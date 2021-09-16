// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;
import "./DaiToken.sol";
import "./Token.sol";

contract TokenFarm { 

string public name = "Token Farm";
Token public token;
DaiToken public daiToken;
address[] public stakers;  
address public owner;
mapping(address => uint) public stakingBalance;
mapping(address => bool) public hasStaked;
mapping(address => bool) public isStaking;


constructor (Token _token , DaiToken _daiToken) public {
                token  =_token;
                daiToken = _daiToken;
                owner = msg.sender;
}


function StakeTokens(uint _ammount) public {

    require(_ammount > 0 ,"ammount cannot be zero");

    daiToken.transferFrom(msg.sender,address(this), _ammount);
    stakingBalance[msg.sender] = stakingBalance[msg.sender] + _ammount;
            if(!hasStaked[msg.sender]){
                    stakers.push(msg.sender); 
            }

            hasStaked[msg.sender] = true;
            isStaking[msg.sender] = true;
    
}


function unstakeTokens() public {

    uint balance = stakingBalance[msg.sender];
    require(balance > 0 , "Staking Balance Cannot be Zero"); 

    daiToken.transfer(msg.sender, balance);

    stakingBalance[msg.sender] = 0;

    isStaking[msg.sender] = false;



}


function issueToke() public {
        require(msg.sender == owner,"caller must be owner");

        for(uint i=0 ; i<stakers.length; i++){
            address receipant = stakers[i];
            uint balance = stakingBalance[receipant];
            if(balance > 0){
                token.transfer(receipant, balance); 
            }

        }
}






}