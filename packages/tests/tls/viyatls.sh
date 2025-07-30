kubectl cp $(kubectl get pod | grep "sas-consul-server-0" | awk -F" " '{print $1}'):security/ca.crt ./ca.crt
kubectl cp $(kubectl get pod | grep "sas-consul-server-0" | awk -F" " '{print $1}'):security/tls.crt ./tls.crt
kubectl cp $(kubectl get pod | grep "sas-consul-server-0" | awk -F" " '{print $1}'):security/tls.key ./tls.key