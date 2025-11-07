let dati="<Tests> \
  <Test TestId='0001' TestType='CMD'>\
  \
  \
    <Name>Convert number to string</Name>\
    <CommandLine>Examp1.EXE</CommandLine>\
    <Input>1</Input>\
    <Output>One</Output>\
    <DataExecution>\
      <data>2020 08 15</data>\
      <data>2020 08 25</data>\
      <data>2020 09 30</data>\
    </DataExecution>\
  </Test>\
  \
  \
  <Test TestId='0002' TestType='CMD'>\
    <Name>Find succeeding characters</Name>\
    <CommandLine>Examp2.EXE</CommandLine>\
    <Input>abc</Input>\
    <Output>def</Output>\
    <DataExecution>\
      <data>2020 10 01</data>\
    </DataExecution>\
  </Test>\
  \
  \
  <Test TestId='0003' TestType='GUI'>\
    <Name>Convert multiple numbers to strings</Name>\
    <CommandLine>Examp2.EXE /Verbose</CommandLine>\
    <Input>123</Input>\
    <Output>One Two Three</Output>\
  <DataExecution></DataExecution>\
  </Test>\
  \
  \
  <Test TestId='0004' TestType='GUI'>\
    <Name>Find correlated key</Name>\
    <CommandLine>Examp3.EXE</CommandLine>\
    <Input>a1</Input>\
    <Output>b1</Output>\
    <DataExecution>\
      <data>2020 09 14</data>\
      <data>2020 10 03</data>\
    </DataExecution>\
  </Test>\
  \
  \
  <Test TestId='0005' TestType='GUI'>\
    <Name>Count characters</Name>\
    <CommandLine>FinalExamp.EXE</CommandLine>\
    <Input>This is a test</Input>\
    <Output>14</Output>\
    <DataExecution>\
      <data>2020 09 22</data>\
    </DataExecution>\
  </Test>\
  \
  \
  <Test TestId='0006' TestType='GUI'>\
    <Name>Another Test</Name>\
    <CommandLine>Examp2.EXE</CommandLine>\
    <Input>Test Input</Input>\
    <Output>10</Output>\
    <DataExecution>\
      <data>2020 08 30</data>\
      <data>2020 08 31</data>\
      <data>2020 09 15</data>\
      <data>2020 09 25</data>\
      <data>2020 10 04</data>\
    </DataExecution>\
  </Test>\
  \
  \
</Tests>";