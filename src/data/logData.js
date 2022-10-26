export const data = [
  {
    id: 1,
    user: "Atakan",
    RequestXml: `    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:tracelink:soap">
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
  </soapenv:Envelope>`,
    ResponseXml: `
  <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
<S:Body>
<ns2:UpdateOrderShipmentResponse xmlns:ns2="urn:tracelink:soap" xmlns:ns3="http://tracelink.com/som">
<TLResponse>
<Success>true</Success>
</TLResponse>
</ns2:UpdateOrderShipmentResponse>
</S:Body>
</S:Envelope
  `,
    Error: "No Error",
  },
  {
    id: 2,
    user: "Atakan",
    RequestXml: `    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:tracelink:soap">
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
  </soapenv:Envelope>`,
    ResponseXml: `
  <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
<S:Body>
<ns2:UpdateOrderShipmentResponse xmlns:ns2="urn:tracelink:soap" xmlns:ns3="http://tracelink.com/som">
<TLResponse>
<Success>true</Success>
</TLResponse>
</ns2:UpdateOrderShipmentResponse>
</S:Body>
</S:Envelope
  `,
    Error: "No Error",
  },
  {
    id: 3,
    user: "Atakan",
    RequestXml: `    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:tracelink:soap">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:UpdateOrderShipment>
          <OrderRequest deliverynumber="26.05.2022">
       </urn:UpdateOrderShipment>
    </soapenv:Body>
  </soapenv:Envelope>`,
    ResponseXml: `
  <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
<S:Body>
<ns2:UpdateOrderShipmentResponse xmlns:ns2="urn:tracelink:soap" xmlns:ns3="http://tracelink.com/som">
<TLResponse>
<Success>true</Success>
</TLResponse>
</ns2:UpdateOrderShipmentResponse>
</S:Body>
</S:Envelope
  `,
    Error: "No Error",
  },
];
