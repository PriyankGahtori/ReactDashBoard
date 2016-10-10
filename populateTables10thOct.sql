BEGIN;

INSERT INTO config.profile(profile_id,profile_name,profile_desc) VALUES (1,'default','Default profile');

INSERT INTO config.entry_type(entry_type_id, entry_type_name, entry_type_detail) VALUES (1,'HttpServletService','description'), (2,'EntryForWebLogicJSP','description'), (3,'ApacheJsperService','description'), (4, 'jerseyCall', 'description'), (5,'glassFishJersey', 'description'),(6,'Generic', 'description'),
(7,'JMSCall', 'description');

INSERT INTO config.service_entry_points(entry_id,entry_desc,entry_fqm,entry_name,entry_type_id) VALUES(1,'Fully qualified name for the service method for HttpServlet Class','javax.servlet.http.HttpServlet.service(Ljavax/servlet/http/HttpServletRequest;Ljavax/servlet/http/HttpServletResponse;)', 'HttpServlet.service', 1),
(2,'fully qualified name for the doFilter method for weblogic','weblogic.servlet.internal.FilterChainImpl.doFilter(Ljavax/servlet/ServletRequest;Ljavax/servlet/ServletResponse;)','FilterChainImpl.doFilter', 2),
(3,' ','org.apache.jasper.runtime.HttpJspBase.service(Ljavax/servlet/http/HttpServletRequest;Ljavax/servlet/http/HttpServletResponse;)','ApacheJsperService', 3), 
(4,' ','weblogic.servlet.jsp.JspBase.service(Ljavax/servlet/ServletRequest;Ljavax/servlet/ServletResponse;)V','WebAppFilterChain.doFilter', 2),  
(5,' ','com.ibm.ws.webcontainer.servlet.ServletWrapper.service(Ljavax/servlet/ServletRequest;Ljavax/servlet/ServletResponse;)','ServletWrapper.service', 2),
(6,' ','com.ibm.ws.webcontainer.servlet.ServletWrapper.service(Ljavax/servlet/ServletRequest;Ljavax/servlet/ServletResponse;Lcom/ibm/ws/webcontainer/webapp/WebAppServletInvocationEvent;)V','ServletWrapper.service-WebAppServletInvocationEvent', 2),
(7,' ','com.sun.jersey.spi.container.servlet.WebComponent.service(Ljava/net/URI;Ljava/net/URI;Ljavax/servlet/http/HttpServletRequest;Ljavax/servlet/http/HttpServletResponse;)I','WebComponent.service', 4),
(8,' ','org.glassfish.jersey.servlet.ServletContainer.service(Ljavax/servlet/ServletRequest;Ljavax/servlet/ServletResponse;)V','ServletContainer.service', 5),
(9,' ','com.ibm.ws.webcontainer.filter.WebAppFilterChain.doFilter(Ljavax/servlet/ServletRequest;Ljavax/servlet/ServletResponse;)V','WebAppFilterChain.doFilter', 2),
(10,' ','org.springframework.jms.listener.AbstractMessageListenerContainer.invokeListener(Ljavax/jms/Session;Ljavax/jms/Message;)V','AbstractMessageListenerContainer.invokeListener',7);

INSERT INTO config.profile_service_entry_asso(prof_entry_id, profile_enable, entry_id, profile_id) VALUES (1, true, 1, 1), (2,true,2,1), (3, true, 3, 1),(4, true, 4, 1),(5, true, 5, 1),(6, true, 6, 1),(7, true, 7, 1),(8, true, 8, 1),(9, true, 9, 1),(10, true, 10, 1);

INSERT INTO config.keywords_meta_data(kmd_id,key_type,key_type_id) VALUES(1,'char','0'),(2,'integer','1'),(3,'double','2'),(4,'long long','3'),(5,'string','4'),(6,'file',5);

INSERT INTO config.keywords(key_id,key_name,key_min,key_max,kmd_id,key_def_value) VALUES 
(1,'bciInstrSessionPct','0','100','2','5'),
(2,'logLevelOneFpMethod','0','1','1','0'),
(3,'enableBciDebug','0','6','1','0'),
(4,'enableBciError','1','100','5','0'),
(5,'doNotDiscardFlowPaths','0','1','2','0'),
(6,'ASSampleInterval','0','5000','4','500'),
(7,'ASThresholdMatchCount','1','100','4','5'),
(8,'ASReportInterval','0','900000','4','0'),
(10,'instrProfile',' ',' ','5',' '),
(11,'ASDepthFilter','0','100','2','20'),
(12,'ASTraceLevel','0','20','2','0'),
(13,'setCavNVCookie','0','10240','5','0'),
(14,'enableCpuTime','0','1024','1','0'),
(15,'enableForcedFPChain','0','3','2','1'),
(16,'InstrTraceLevel','0','11','2','0'),
(17,'instrExceptions','0','512','5','0'),
(18,'correlationIDHeader','0','1024','5','0'),
(19,'ASStackComparingDepth','0','1000','4','10'),
(20,'putDelayInMethod','0','10240','5','0');



INSERT INTO config.backend_type(backend_type_id,backend_type_detail,backend_type_name,backend_type_name_entrypointsfile,backend_type_name_rulefile) VALUES (1,'http backend','HTTP','HttpCallout','HTTP'),


INSERT INTO config.backend_points(end_point_id,end_point_desc,end_point_fqm,end_point_name,backend_type_id ) VALUES(1,'HTTP end point','org.apache.commons.httpclient.HttpMethodDirector.executeMethod(Lorg/apache/commons/httpclient/HttpMethod;)','Apace HTTP Client',1),
(2,'HTTP end point','com.endeca.navigation.HttpENEConnection.query(Lcom/endeca/navigation/ENEQuery;)Lcom/endeca/navigation/ENEQueryResults','Endeca',1),(3,'HTTP end point','org.apache.http.impl.client.AbstractHttpClient.execute(Lorg/apache/http/HttpHost;Lorg/apache/http/HttpRequest;Lorg/apache/http/protocol/HttpContext;)Lorg/apache/http/HttpResponse;','Apache AbstractHttpClient',1),
(4,'HTTP end point','org.apache.http.impl.client.DefaultRequestDirector.execute(Lorg/apache/http/HttpHost;Lorg/apache/http/HttpRequest;Lorg/apache/http/protocol/HttpContext;)Lorg/apache/http/HttpResponse;','Apache Default HTTP Client',1),
(5,'HTTP end point','.org.apache.wink.client.internal.handlers.HttpURLConnectionHandler.processRequest(Lorg/apache/wink/client/ClientRequest;Lorg/apache/wink/client/handlers/HandlerContext;)Ljava/net/HttpURLConnection;','Apache Wink Client',1),
(6,'HTTP end point','com.worklight.adapters.http.HTTPConnectionManager.execute(Lorg/apache/http/HttpRequest;Lorg/apache/http/protocol/HttpContext;)Lorg/apache/http/HttpResponse;','MFP Worklight HTTP Client',1),
(7,'HTTP end point','org.springframework.web.client.RestTemplate.doExecute(Ljava/net/URI;Lorg/springframework/http/HttpMethod;Lorg/springframework/web/client/RequestCallback;Lorg/springframework/web/client/ResponseExtractor;)Ljava/lang/Object;','Spring REST Template Client',1),
(8,'HTTP end point','org.springframework.web.client.RestTemplate$HttpEntityRequestCallback.doWithRequest(Lorg/springframework/http/client/ClientHttpRequest;)V','Spring add Header in REST Callback Template Client',1),
(9,'HTTP end point','org.springframework.http.client.support.HttpAccessor.createRequest(Ljava/net/URI;Lorg/springframework/http/HttpMethod;)Lorg/springframework/http/client/ClientHttpRequest;','Spring add Header in REST Client Template Client',1),
(10,'HTTP end point','org.apache.http.impl.client.InternalHttpClient.doExecute(Lorg/apache/http/HttpHost;Lorg/apache/http/HttpRequest;Lorg/apache/http/protocol/HttpContext;)Lorg/apache/http/client/methods/CloseableHttpResponse','Apache Internal HTTP Client','1'),
(11,'WS end point','org.glassfish.jersey.client.JerseyInvocation.invoke()Ljavax/ws/rs/core/Response;','Jersey Webservice Client',2),
(12,'WS end point','com.sun.xml.messaging.saaj.client.p2p.HttpSOAPConnection.post(Ljavax/xml/soap/SOAPMessage;Ljava/net/URL;)Ljavax/xml/soap/SOAPMessage','HTTP SOAP connection',2),
(13,'WS end point','com.sun.xml.ws.transport.http.client.HttpClientTransport.<init>(Lcom/sun/xml/ws/api/message/Packet;Ljava/util/Map;)V','HTTP Client Transport',2),
(14,'WS end point','com.sun.xml.ws.transport.http.client.HttpTransportPipe.processRequest(Lcom/sun/xml/ws/api/message/Packet;)Lcom/sun/xml/ws/api/pipe/NextAction;','HTTP Transport Pipe',2),
(15,'WS end point','org.apache.cxf.jaxws.JaxWsClientProxy.invoke(Ljava/lang/Object;Ljava/lang/reflect/Method;[Ljava/lang/Object;)Ljava/lang/Object;','Apache cxf Webservice',2),
(16,'RMI end point','java.rmi.Naming.lookup(Ljava/lang/String','RMI Lookup Calls',5),
(17,'RMI end point','sun.rmi.server.UnicastRef.invoke(Ljava/rmi/Remote;Ljava/lang/reflect/Method;[Ljava/lang/Object;J)','RMI Request',5),
(19,'JDBC end point','oracle.jdbc.driver.OraclePreparedStatementWrapper','oracleDB',3),
(20,'HADOOP end point','org.springframework.data.hadoop.hbase.HbaseTemplate.execute(Ljava/lang/String;Lorg/springframework/data/hadoop/hbase/TableCallback;)Ljava/lang/Object','Spring HBASE',8),
(21,'COHERENCE end point','com.tangosol.net.cache.CachingMap.get(Ljava/lang/Object;)Ljava/lang/Object;','Coherence get',4),
(22,'COHERENCE end point','com.tangosol.net.cache.CachingMap.getAll(Ljava/util/Collection;)Ljava/util/Map;','Coherence getAll',4),
(23,'COHERENCE end point','com.tangosol.net.cache.CachingMap.put(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;','Coherence put',4),
(24,'COHERENCE end point','com.tangosol.net.cache.CachingMap.put(Ljava/lang/Object;Ljava/lang/Object;ZJ)Ljava/lang/Object;','Coherence put',4),
(25,'COHERENCE end point','com.tangosol.net.cache.CachingMap.putAll(Ljava/util/Map;)','Coherence putAll',4),
(26,'COHERENCE end point','com.tangosol.net.cache.CachingMap.remove(Ljava/lang/Object;)Ljava/lang/Object;','Coherence remove',4),
(27,'MEM CACHE end point','net.rubyeye.xmemcached.XMemcachedClient.add0(Ljava/lang/String;ILjava/lang/Object;Lnet/rubyeye/xmemcached/transcoders/Transcoder;J)','Mem Cache add',6),
(28,'MEM CACHE end point','net.rubyeye.xmemcached.XMemcachedClient.getMulti0(Ljava/util/Collection;JLnet/rubyeye/xmemcached/command/CommandType;Lnet/rubyeye/xmemcached/transcoders/Transcoder;','MEM CACHE getMulti',6),
(29,'MEM CACHE end point','net.rubyeye.xmemcached.XMemcachedClient.get0(Ljava/lang/String;JLnet/rubyeye/xmemcached/command/CommandType;Lnet/rubyeye/xmemcached/transcoders/Transcoder;)Ljava/lang/Object;','Mem Cache get',6),
(30,'MEM CACHE end point','	net.rubyeye.xmemcached.XMemcachedClient.delete0(Ljava/lang/String;IJZJ);','Mem Cache delete',6),
(31,'MEM CACHE end point','net.rubyeye.xmemcached.XMemcachedClient.replace(Ljava/lang/String;ILjava/lang/Object;Lnet/rubyeye/xmemcached/transcoders/Transcoder;J);','Mem Cache replace',6),
(32,'CLOUDANT end point','	org.lightcouch.CouchDbClientBase.executeRequest(Lorg/apache/http/client/methods/HttpRequestBase;)Lorg/apache/http/HttpResponse;','Cloudant executeRequest',7);



INSERT INTO config.naming_rule_profile_backendtype_asso(assoc_id,host ,port,prefix ,service_name,table_name,topic_name,url,databaseproduct_name,databaseproduct_version,driver_name,driver_Version,query,user_name,backend_type_id,profile_id) VALUES
(1,true,false,false,false,false,false,false,false,false,false,false,false,false,1,1),
(2,true,false,false,false,false,false,false,false,false,false,false,false,false,2,1),
(3,true,false,false,false,false,false,false,false,false,false,false,false,false,3,1),
(4,true,false,false,false,false,false,false,false,false,false,false,false,false,4,1),
(5,true,false,false,false,false,false,false,false,false,false,false,false,false,5,1),
(6,true,false,false,false,false,false,false,false,false,false,false,false,false,6,1),
(7,true,false,false,false,false,false,false,false,false,false,false,false,false,7,1),
(8,true,false,false,false,false,false,false,false,false,false,false,false,false,8,1),
(9,true,false,false,false,false,false,false,false,false,false,false,false,false,9,1);

INSERT INTO config.profile_backend_point_asso(assoc_id,enabled,end_point_id,profile_id) VALUES(1,true,1,1),(2,true,2,1),(3,true,3,1),(4,false,4,1),(5,false,5,1),(6,false,6,1),(7,false,7,1),(8,false,8,1),
(9,false,9,1),(10,false,10,1),(11,false,11,1),(12,false,12,1),(13,false,13,1),(14,false,14,1),(15,false,15,1),(16,false,16,1),(17,false,17,1),(19,false,19,1),(20,false,20,1),
(21,false,21,1),(22,false,22,1),(23,false,23,1),(24,false,24,1),(25,false,25,1),(26,false,26,1),(27,false,27,1),(28,false,28,1),(29,false,29,1),(30,false,30,1),(31,false,31,1),(32,false,32,1);
COMMIT;
