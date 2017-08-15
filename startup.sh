#!/bin/bash
have_tty=0
if [ "`tty`" != "not a tty" ]; then
    have_tty=1
fi
echo -n $"Starting $prog: "
proc_name="gcfServer.jar"
name_suffixx="\>"
proc_id=`ps -ef|grep -i ${proc_name}${name_suffixx}|grep -v "grep"|awk '{print $2}'`
if [[ -z $proc_id ]];then
    nohup java -jar gcfServer.jar /home/tk/usr/local/web-moban/ &
    if [ $have_tty -eq 1 ]; then
    proc_id=`ps -ef|grep -i ${proc_name}${name_suffixx}|grep -v "grep"|awk '{print $2}'`
    echo ${proc_name}" pid:"${proc_id[@]}	
	fi
else
    echo ${proc_name}" pid:"${proc_id[@]}
    echo "This jar is already running!"
fi
