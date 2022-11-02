export function generateData(count) {
  let i;
  const moduleName = [
    'OutboundMain',
    'OutboundMain',
    'DisaggregateItemsFromContainer',
    'GetSerialNumberStatus',
    'ReconcileContainer',
    'ReconcileContainer',
    'GetSerialNumberStatus',
    'DisaggregateItemsFromContainer',
    'DisaggregateItemsFromContainer',
    'DisaggregateItemsFromContainer',
  ];
  const names = ['James', 'John', 'Robert', 'Christopher', 'George', 'Mary', 'Nancy', 'Sandra', 'Michelle', 'Betty'];
  const messages = [
    'Downloaded open orders from Tracelink',
    'Delivery2507 searched successfully',
    'Downloaded open orders from Tracelink',
    'Delivery0909 searched successfully',
    '2022080501 searched successfully',
    'SO20220811 searched successfully',
    'Delivery2705 searched successfully',
    '2022080501 searched successfully',
    'SO20220811 searched successfully',
    'Delivery2705 searched successfully',
  ];

  const RequestXML = `    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:tracelink:soap">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:UpdateOrderShipment>
         <OrderRequest deliverynumber="26.05.2022">
            <OrderComplete>true</OrderComplete>
            <AttemptDisaggregation>true</AttemptDisaggregation>
            <PickedItem>
               <Items>
               0012311231231232,002412412312321
               </Items>
            </PickedItem>
         </OrderRequest>
      </urn:UpdateOrderShipment>
   </soapenv:Body>
 </soapenv:Envelope>`;
  const ResponseXML = `
   <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
 <S:Body>
 <ns2:UpdateOrderShipmentResponse xmlns:ns2="urn:tracelink:soap" xmlns:ns3="http://tracelink.com/som">
 <TLResponse>
 <Success>true</Success>
 </TLResponse>
 </ns2:UpdateOrderShipmentResponse>
 </S:Body>
 </S:Envelope
   `;
  const items = [];

  for (i = 0; i < count; i += 1) {
    const nameIndex = random();
    const item = {
      ID: i + 1,
      Username: names[nameIndex],
      RequestXML: RequestXML,
      ResponseXML: ResponseXML,
      ClientMessage: messages[nameIndex],
      ModuleName: moduleName[nameIndex],
      RequestDate: '2022-10-11 22:03:00.6820000 +00:00',
      Error: 'No Error',
    };
    items.push(item);
  }
  return items;
}

let s = 123456789;
function random() {
  s = (1103515245 * s + 12345) % 2147483647;
  return s % (10 - 1);
}
