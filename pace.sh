#!/bin/bash
while read line 
do
  echo $line
  sleep .3;
done < real.json
