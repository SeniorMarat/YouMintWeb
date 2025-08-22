import type {
  ABIGetter,
  ABIReceiver,
  ABIType,
  Address,
  Contract,
  ContractABI,
  ContractProvider,
  DictionaryValue,
  Sender,
  TupleReader,
} from "@ton/core"
import {
  beginCell,
  Builder,
  Cell,
  contractAddress,
  Slice,
  TupleBuilder,
} from "@ton/core"

export type DataSize = {
  $$type: "DataSize"
  cells: bigint
  bits: bigint
  refs: bigint
}

export function storeDataSize(src: DataSize) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeInt(src.cells, 257)
    b_0.storeInt(src.bits, 257)
    b_0.storeInt(src.refs, 257)
  }
}

export function loadDataSize(slice: Slice) {
  const sc_0 = slice
  const _cells = sc_0.loadIntBig(257)
  const _bits = sc_0.loadIntBig(257)
  const _refs = sc_0.loadIntBig(257)
  return { $$type: "DataSize" as const, cells: _cells, bits: _bits, refs: _refs }
}

export function loadTupleDataSize(source: TupleReader) {
  const _cells = source.readBigNumber()
  const _bits = source.readBigNumber()
  const _refs = source.readBigNumber()
  return { $$type: "DataSize" as const, cells: _cells, bits: _bits, refs: _refs }
}

export function loadGetterTupleDataSize(source: TupleReader) {
  const _cells = source.readBigNumber()
  const _bits = source.readBigNumber()
  const _refs = source.readBigNumber()
  return { $$type: "DataSize" as const, cells: _cells, bits: _bits, refs: _refs }
}

export function storeTupleDataSize(source: DataSize) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.cells)
  builder.writeNumber(source.bits)
  builder.writeNumber(source.refs)
  return builder.build()
}

export function dictValueParserDataSize(): DictionaryValue<DataSize> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDataSize(src)).endCell())
    },
    parse: (src) => {
      return loadDataSize(src.loadRef().beginParse())
    },
  }
}

export type SignedBundle = {
  $$type: "SignedBundle"
  signature: Buffer
  signedData: Slice
}

export function storeSignedBundle(src: SignedBundle) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeBuffer(src.signature)
    b_0.storeBuilder(src.signedData.asBuilder())
  }
}

export function loadSignedBundle(slice: Slice) {
  const sc_0 = slice
  const _signature = sc_0.loadBuffer(64)
  const _signedData = sc_0
  return { $$type: "SignedBundle" as const, signature: _signature, signedData: _signedData }
}

export function loadTupleSignedBundle(source: TupleReader) {
  const _signature = source.readBuffer()
  const _signedData = source.readCell().asSlice()
  return { $$type: "SignedBundle" as const, signature: _signature, signedData: _signedData }
}

export function loadGetterTupleSignedBundle(source: TupleReader) {
  const _signature = source.readBuffer()
  const _signedData = source.readCell().asSlice()
  return { $$type: "SignedBundle" as const, signature: _signature, signedData: _signedData }
}

export function storeTupleSignedBundle(source: SignedBundle) {
  const builder = new TupleBuilder()
  builder.writeBuffer(source.signature)
  builder.writeSlice(source.signedData.asCell())
  return builder.build()
}

export function dictValueParserSignedBundle(): DictionaryValue<SignedBundle> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSignedBundle(src)).endCell())
    },
    parse: (src) => {
      return loadSignedBundle(src.loadRef().beginParse())
    },
  }
}

export type StateInit = {
  $$type: "StateInit"
  code: Cell
  data: Cell
}

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeRef(src.code)
    b_0.storeRef(src.data)
  }
}

export function loadStateInit(slice: Slice) {
  const sc_0 = slice
  const _code = sc_0.loadRef()
  const _data = sc_0.loadRef()
  return { $$type: "StateInit" as const, code: _code, data: _data }
}

export function loadTupleStateInit(source: TupleReader) {
  const _code = source.readCell()
  const _data = source.readCell()
  return { $$type: "StateInit" as const, code: _code, data: _data }
}

export function loadGetterTupleStateInit(source: TupleReader) {
  const _code = source.readCell()
  const _data = source.readCell()
  return { $$type: "StateInit" as const, code: _code, data: _data }
}

export function storeTupleStateInit(source: StateInit) {
  const builder = new TupleBuilder()
  builder.writeCell(source.code)
  builder.writeCell(source.data)
  return builder.build()
}

export function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStateInit(src)).endCell())
    },
    parse: (src) => {
      return loadStateInit(src.loadRef().beginParse())
    },
  }
}

export type Context = {
  $$type: "Context"
  bounceable: boolean
  sender: Address
  value: bigint
  raw: Slice
}

export function storeContext(src: Context) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeBit(src.bounceable)
    b_0.storeAddress(src.sender)
    b_0.storeInt(src.value, 257)
    b_0.storeRef(src.raw.asCell())
  }
}

export function loadContext(slice: Slice) {
  const sc_0 = slice
  const _bounceable = sc_0.loadBit()
  const _sender = sc_0.loadAddress()
  const _value = sc_0.loadIntBig(257)
  const _raw = sc_0.loadRef().asSlice()
  return { $$type: "Context" as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw }
}

export function loadTupleContext(source: TupleReader) {
  const _bounceable = source.readBoolean()
  const _sender = source.readAddress()
  const _value = source.readBigNumber()
  const _raw = source.readCell().asSlice()
  return { $$type: "Context" as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw }
}

export function loadGetterTupleContext(source: TupleReader) {
  const _bounceable = source.readBoolean()
  const _sender = source.readAddress()
  const _value = source.readBigNumber()
  const _raw = source.readCell().asSlice()
  return { $$type: "Context" as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw }
}

export function storeTupleContext(source: Context) {
  const builder = new TupleBuilder()
  builder.writeBoolean(source.bounceable)
  builder.writeAddress(source.sender)
  builder.writeNumber(source.value)
  builder.writeSlice(source.raw.asCell())
  return builder.build()
}

export function dictValueParserContext(): DictionaryValue<Context> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeContext(src)).endCell())
    },
    parse: (src) => {
      return loadContext(src.loadRef().beginParse())
    },
  }
}

export type SendParameters = {
  $$type: "SendParameters"
  mode: bigint
  body: Cell | null
  code: Cell | null
  data: Cell | null
  value: bigint
  to: Address
  bounce: boolean
}

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeInt(src.mode, 257)
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body)
    } else {
      b_0.storeBit(false)
    }
    if (src.code !== null && src.code !== undefined) {
      b_0.storeBit(true).storeRef(src.code)
    } else {
      b_0.storeBit(false)
    }
    if (src.data !== null && src.data !== undefined) {
      b_0.storeBit(true).storeRef(src.data)
    } else {
      b_0.storeBit(false)
    }
    b_0.storeInt(src.value, 257)
    b_0.storeAddress(src.to)
    b_0.storeBit(src.bounce)
  }
}

export function loadSendParameters(slice: Slice) {
  const sc_0 = slice
  const _mode = sc_0.loadIntBig(257)
  const _body = sc_0.loadBit() ? sc_0.loadRef() : null
  const _code = sc_0.loadBit() ? sc_0.loadRef() : null
  const _data = sc_0.loadBit() ? sc_0.loadRef() : null
  const _value = sc_0.loadIntBig(257)
  const _to = sc_0.loadAddress()
  const _bounce = sc_0.loadBit()
  return { $$type: "SendParameters" as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce }
}

export function loadTupleSendParameters(source: TupleReader) {
  const _mode = source.readBigNumber()
  const _body = source.readCellOpt()
  const _code = source.readCellOpt()
  const _data = source.readCellOpt()
  const _value = source.readBigNumber()
  const _to = source.readAddress()
  const _bounce = source.readBoolean()
  return { $$type: "SendParameters" as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce }
}

export function loadGetterTupleSendParameters(source: TupleReader) {
  const _mode = source.readBigNumber()
  const _body = source.readCellOpt()
  const _code = source.readCellOpt()
  const _data = source.readCellOpt()
  const _value = source.readBigNumber()
  const _to = source.readAddress()
  const _bounce = source.readBoolean()
  return { $$type: "SendParameters" as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce }
}

export function storeTupleSendParameters(source: SendParameters) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.mode)
  builder.writeCell(source.body)
  builder.writeCell(source.code)
  builder.writeCell(source.data)
  builder.writeNumber(source.value)
  builder.writeAddress(source.to)
  builder.writeBoolean(source.bounce)
  return builder.build()
}

export function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSendParameters(src)).endCell())
    },
    parse: (src) => {
      return loadSendParameters(src.loadRef().beginParse())
    },
  }
}

export type MessageParameters = {
  $$type: "MessageParameters"
  mode: bigint
  body: Cell | null
  value: bigint
  to: Address
  bounce: boolean
}

export function storeMessageParameters(src: MessageParameters) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeInt(src.mode, 257)
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body)
    } else {
      b_0.storeBit(false)
    }
    b_0.storeInt(src.value, 257)
    b_0.storeAddress(src.to)
    b_0.storeBit(src.bounce)
  }
}

export function loadMessageParameters(slice: Slice) {
  const sc_0 = slice
  const _mode = sc_0.loadIntBig(257)
  const _body = sc_0.loadBit() ? sc_0.loadRef() : null
  const _value = sc_0.loadIntBig(257)
  const _to = sc_0.loadAddress()
  const _bounce = sc_0.loadBit()
  return { $$type: "MessageParameters" as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce }
}

export function loadTupleMessageParameters(source: TupleReader) {
  const _mode = source.readBigNumber()
  const _body = source.readCellOpt()
  const _value = source.readBigNumber()
  const _to = source.readAddress()
  const _bounce = source.readBoolean()
  return { $$type: "MessageParameters" as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce }
}

export function loadGetterTupleMessageParameters(source: TupleReader) {
  const _mode = source.readBigNumber()
  const _body = source.readCellOpt()
  const _value = source.readBigNumber()
  const _to = source.readAddress()
  const _bounce = source.readBoolean()
  return { $$type: "MessageParameters" as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce }
}

export function storeTupleMessageParameters(source: MessageParameters) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.mode)
  builder.writeCell(source.body)
  builder.writeNumber(source.value)
  builder.writeAddress(source.to)
  builder.writeBoolean(source.bounce)
  return builder.build()
}

export function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell())
    },
    parse: (src) => {
      return loadMessageParameters(src.loadRef().beginParse())
    },
  }
}

export type DeployParameters = {
  $$type: "DeployParameters"
  mode: bigint
  body: Cell | null
  value: bigint
  bounce: boolean
  init: StateInit
}

export function storeDeployParameters(src: DeployParameters) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeInt(src.mode, 257)
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body)
    } else {
      b_0.storeBit(false)
    }
    b_0.storeInt(src.value, 257)
    b_0.storeBit(src.bounce)
    b_0.store(storeStateInit(src.init))
  }
}

export function loadDeployParameters(slice: Slice) {
  const sc_0 = slice
  const _mode = sc_0.loadIntBig(257)
  const _body = sc_0.loadBit() ? sc_0.loadRef() : null
  const _value = sc_0.loadIntBig(257)
  const _bounce = sc_0.loadBit()
  const _init = loadStateInit(sc_0)
  return { $$type: "DeployParameters" as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init }
}

export function loadTupleDeployParameters(source: TupleReader) {
  const _mode = source.readBigNumber()
  const _body = source.readCellOpt()
  const _value = source.readBigNumber()
  const _bounce = source.readBoolean()
  const _init = loadTupleStateInit(source)
  return { $$type: "DeployParameters" as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init }
}

export function loadGetterTupleDeployParameters(source: TupleReader) {
  const _mode = source.readBigNumber()
  const _body = source.readCellOpt()
  const _value = source.readBigNumber()
  const _bounce = source.readBoolean()
  const _init = loadGetterTupleStateInit(source)
  return { $$type: "DeployParameters" as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init }
}

export function storeTupleDeployParameters(source: DeployParameters) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.mode)
  builder.writeCell(source.body)
  builder.writeNumber(source.value)
  builder.writeBoolean(source.bounce)
  builder.writeTuple(storeTupleStateInit(source.init))
  return builder.build()
}

export function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell())
    },
    parse: (src) => {
      return loadDeployParameters(src.loadRef().beginParse())
    },
  }
}

export type StdAddress = {
  $$type: "StdAddress"
  workchain: bigint
  address: bigint
}

export function storeStdAddress(src: StdAddress) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeInt(src.workchain, 8)
    b_0.storeUint(src.address, 256)
  }
}

export function loadStdAddress(slice: Slice) {
  const sc_0 = slice
  const _workchain = sc_0.loadIntBig(8)
  const _address = sc_0.loadUintBig(256)
  return { $$type: "StdAddress" as const, workchain: _workchain, address: _address }
}

export function loadTupleStdAddress(source: TupleReader) {
  const _workchain = source.readBigNumber()
  const _address = source.readBigNumber()
  return { $$type: "StdAddress" as const, workchain: _workchain, address: _address }
}

export function loadGetterTupleStdAddress(source: TupleReader) {
  const _workchain = source.readBigNumber()
  const _address = source.readBigNumber()
  return { $$type: "StdAddress" as const, workchain: _workchain, address: _address }
}

export function storeTupleStdAddress(source: StdAddress) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.workchain)
  builder.writeNumber(source.address)
  return builder.build()
}

export function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStdAddress(src)).endCell())
    },
    parse: (src) => {
      return loadStdAddress(src.loadRef().beginParse())
    },
  }
}

export type VarAddress = {
  $$type: "VarAddress"
  workchain: bigint
  address: Slice
}

export function storeVarAddress(src: VarAddress) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeInt(src.workchain, 32)
    b_0.storeRef(src.address.asCell())
  }
}

export function loadVarAddress(slice: Slice) {
  const sc_0 = slice
  const _workchain = sc_0.loadIntBig(32)
  const _address = sc_0.loadRef().asSlice()
  return { $$type: "VarAddress" as const, workchain: _workchain, address: _address }
}

export function loadTupleVarAddress(source: TupleReader) {
  const _workchain = source.readBigNumber()
  const _address = source.readCell().asSlice()
  return { $$type: "VarAddress" as const, workchain: _workchain, address: _address }
}

export function loadGetterTupleVarAddress(source: TupleReader) {
  const _workchain = source.readBigNumber()
  const _address = source.readCell().asSlice()
  return { $$type: "VarAddress" as const, workchain: _workchain, address: _address }
}

export function storeTupleVarAddress(source: VarAddress) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.workchain)
  builder.writeSlice(source.address.asCell())
  return builder.build()
}

export function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeVarAddress(src)).endCell())
    },
    parse: (src) => {
      return loadVarAddress(src.loadRef().beginParse())
    },
  }
}

export type BasechainAddress = {
  $$type: "BasechainAddress"
  hash: bigint | null
}

export function storeBasechainAddress(src: BasechainAddress) {
  return (builder: Builder) => {
    const b_0 = builder
    if (src.hash !== null && src.hash !== undefined) {
      b_0.storeBit(true).storeInt(src.hash, 257)
    } else {
      b_0.storeBit(false)
    }
  }
}

export function loadBasechainAddress(slice: Slice) {
  const sc_0 = slice
  const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null
  return { $$type: "BasechainAddress" as const, hash: _hash }
}

export function loadTupleBasechainAddress(source: TupleReader) {
  const _hash = source.readBigNumberOpt()
  return { $$type: "BasechainAddress" as const, hash: _hash }
}

export function loadGetterTupleBasechainAddress(source: TupleReader) {
  const _hash = source.readBigNumberOpt()
  return { $$type: "BasechainAddress" as const, hash: _hash }
}

export function storeTupleBasechainAddress(source: BasechainAddress) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.hash)
  return builder.build()
}

export function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell())
    },
    parse: (src) => {
      return loadBasechainAddress(src.loadRef().beginParse())
    },
  }
}

export type Buy = {
  $$type: "Buy"
  minTokensOut: bigint
}

export function storeBuy(src: Buy) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(3080276119, 32)
    b_0.storeCoins(src.minTokensOut)
  }
}

export function loadBuy(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 3080276119) {
    throw new Error("Invalid prefix")
  }
  const _minTokensOut = sc_0.loadCoins()
  return { $$type: "Buy" as const, minTokensOut: _minTokensOut }
}

export function loadTupleBuy(source: TupleReader) {
  const _minTokensOut = source.readBigNumber()
  return { $$type: "Buy" as const, minTokensOut: _minTokensOut }
}

export function loadGetterTupleBuy(source: TupleReader) {
  const _minTokensOut = source.readBigNumber()
  return { $$type: "Buy" as const, minTokensOut: _minTokensOut }
}

export function storeTupleBuy(source: Buy) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.minTokensOut)
  return builder.build()
}

export function dictValueParserBuy(): DictionaryValue<Buy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeBuy(src)).endCell())
    },
    parse: (src) => {
      return loadBuy(src.loadRef().beginParse())
    },
  }
}

export type Sell = {
  $$type: "Sell"
  tokenIn: bigint
  minTonOut: bigint
}

export function storeSell(src: Sell) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(2259500909, 32)
    b_0.storeCoins(src.tokenIn)
    b_0.storeCoins(src.minTonOut)
  }
}

export function loadSell(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 2259500909) {
    throw new Error("Invalid prefix")
  }
  const _tokenIn = sc_0.loadCoins()
  const _minTonOut = sc_0.loadCoins()
  return { $$type: "Sell" as const, tokenIn: _tokenIn, minTonOut: _minTonOut }
}

export function loadTupleSell(source: TupleReader) {
  const _tokenIn = source.readBigNumber()
  const _minTonOut = source.readBigNumber()
  return { $$type: "Sell" as const, tokenIn: _tokenIn, minTonOut: _minTonOut }
}

export function loadGetterTupleSell(source: TupleReader) {
  const _tokenIn = source.readBigNumber()
  const _minTonOut = source.readBigNumber()
  return { $$type: "Sell" as const, tokenIn: _tokenIn, minTonOut: _minTonOut }
}

export function storeTupleSell(source: Sell) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.tokenIn)
  builder.writeNumber(source.minTonOut)
  return builder.build()
}

export function dictValueParserSell(): DictionaryValue<Sell> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSell(src)).endCell())
    },
    parse: (src) => {
      return loadSell(src.loadRef().beginParse())
    },
  }
}

export type BuyNotification = {
  $$type: "BuyNotification"
  amount: bigint
}

export function storeBuyNotification(src: BuyNotification) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(1240528961, 32)
    b_0.storeCoins(src.amount)
  }
}

export function loadBuyNotification(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 1240528961) {
    throw new Error("Invalid prefix")
  }
  const _amount = sc_0.loadCoins()
  return { $$type: "BuyNotification" as const, amount: _amount }
}

export function loadTupleBuyNotification(source: TupleReader) {
  const _amount = source.readBigNumber()
  return { $$type: "BuyNotification" as const, amount: _amount }
}

export function loadGetterTupleBuyNotification(source: TupleReader) {
  const _amount = source.readBigNumber()
  return { $$type: "BuyNotification" as const, amount: _amount }
}

export function storeTupleBuyNotification(source: BuyNotification) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.amount)
  return builder.build()
}

export function dictValueParserBuyNotification(): DictionaryValue<BuyNotification> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeBuyNotification(src)).endCell())
    },
    parse: (src) => {
      return loadBuyNotification(src.loadRef().beginParse())
    },
  }
}

export type JettonWallet$Data = {
  $$type: "JettonWallet$Data"
  balance: bigint
  owner: Address
  minter: Address
}

export function storeJettonWallet$Data(src: JettonWallet$Data) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeCoins(src.balance)
    b_0.storeAddress(src.owner)
    b_0.storeAddress(src.minter)
  }
}

export function loadJettonWallet$Data(slice: Slice) {
  const sc_0 = slice
  const _balance = sc_0.loadCoins()
  const _owner = sc_0.loadAddress()
  const _minter = sc_0.loadAddress()
  return { $$type: "JettonWallet$Data" as const, balance: _balance, owner: _owner, minter: _minter }
}

export function loadTupleJettonWallet$Data(source: TupleReader) {
  const _balance = source.readBigNumber()
  const _owner = source.readAddress()
  const _minter = source.readAddress()
  return { $$type: "JettonWallet$Data" as const, balance: _balance, owner: _owner, minter: _minter }
}

export function loadGetterTupleJettonWallet$Data(source: TupleReader) {
  const _balance = source.readBigNumber()
  const _owner = source.readAddress()
  const _minter = source.readAddress()
  return { $$type: "JettonWallet$Data" as const, balance: _balance, owner: _owner, minter: _minter }
}

export function storeTupleJettonWallet$Data(source: JettonWallet$Data) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.balance)
  builder.writeAddress(source.owner)
  builder.writeAddress(source.minter)
  return builder.build()
}

export function dictValueParserJettonWallet$Data(): DictionaryValue<JettonWallet$Data> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonWallet$Data(src)).endCell())
    },
    parse: (src) => {
      return loadJettonWallet$Data(src.loadRef().beginParse())
    },
  }
}

export type JettonData = {
  $$type: "JettonData"
  totalSupply: bigint
  mintable: boolean
  owner: Address
  content: Cell
  jettonWalletCode: Cell
}

export function storeJettonData(src: JettonData) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeInt(src.totalSupply, 257)
    b_0.storeBit(src.mintable)
    b_0.storeAddress(src.owner)
    b_0.storeRef(src.content)
    b_0.storeRef(src.jettonWalletCode)
  }
}

export function loadJettonData(slice: Slice) {
  const sc_0 = slice
  const _totalSupply = sc_0.loadIntBig(257)
  const _mintable = sc_0.loadBit()
  const _owner = sc_0.loadAddress()
  const _content = sc_0.loadRef()
  const _jettonWalletCode = sc_0.loadRef()
  return { $$type: "JettonData" as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, jettonWalletCode: _jettonWalletCode }
}

export function loadTupleJettonData(source: TupleReader) {
  const _totalSupply = source.readBigNumber()
  const _mintable = source.readBoolean()
  const _owner = source.readAddress()
  const _content = source.readCell()
  const _jettonWalletCode = source.readCell()
  return { $$type: "JettonData" as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, jettonWalletCode: _jettonWalletCode }
}

export function loadGetterTupleJettonData(source: TupleReader) {
  const _totalSupply = source.readBigNumber()
  const _mintable = source.readBoolean()
  const _owner = source.readAddress()
  const _content = source.readCell()
  const _jettonWalletCode = source.readCell()
  return { $$type: "JettonData" as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, jettonWalletCode: _jettonWalletCode }
}

export function storeTupleJettonData(source: JettonData) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.totalSupply)
  builder.writeBoolean(source.mintable)
  builder.writeAddress(source.owner)
  builder.writeCell(source.content)
  builder.writeCell(source.jettonWalletCode)
  return builder.build()
}

export function dictValueParserJettonData(): DictionaryValue<JettonData> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonData(src)).endCell())
    },
    parse: (src) => {
      return loadJettonData(src.loadRef().beginParse())
    },
  }
}

export type JettonWalletData = {
  $$type: "JettonWalletData"
  balance: bigint
  owner: Address
  minter: Address
  code: Cell
}

export function storeJettonWalletData(src: JettonWalletData) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeInt(src.balance, 257)
    b_0.storeAddress(src.owner)
    b_0.storeAddress(src.minter)
    b_0.storeRef(src.code)
  }
}

export function loadJettonWalletData(slice: Slice) {
  const sc_0 = slice
  const _balance = sc_0.loadIntBig(257)
  const _owner = sc_0.loadAddress()
  const _minter = sc_0.loadAddress()
  const _code = sc_0.loadRef()
  return { $$type: "JettonWalletData" as const, balance: _balance, owner: _owner, minter: _minter, code: _code }
}

export function loadTupleJettonWalletData(source: TupleReader) {
  const _balance = source.readBigNumber()
  const _owner = source.readAddress()
  const _minter = source.readAddress()
  const _code = source.readCell()
  return { $$type: "JettonWalletData" as const, balance: _balance, owner: _owner, minter: _minter, code: _code }
}

export function loadGetterTupleJettonWalletData(source: TupleReader) {
  const _balance = source.readBigNumber()
  const _owner = source.readAddress()
  const _minter = source.readAddress()
  const _code = source.readCell()
  return { $$type: "JettonWalletData" as const, balance: _balance, owner: _owner, minter: _minter, code: _code }
}

export function storeTupleJettonWalletData(source: JettonWalletData) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.balance)
  builder.writeAddress(source.owner)
  builder.writeAddress(source.minter)
  builder.writeCell(source.code)
  return builder.build()
}

export function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonWalletData(src)).endCell())
    },
    parse: (src) => {
      return loadJettonWalletData(src.loadRef().beginParse())
    },
  }
}

export type MaybeAddress = {
  $$type: "MaybeAddress"
  address: Address | null
}

export function storeMaybeAddress(src: MaybeAddress) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeAddress(src.address)
  }
}

export function loadMaybeAddress(slice: Slice) {
  const sc_0 = slice
  const _address = sc_0.loadMaybeAddress()
  return { $$type: "MaybeAddress" as const, address: _address }
}

export function loadTupleMaybeAddress(source: TupleReader) {
  const _address = source.readAddressOpt()
  return { $$type: "MaybeAddress" as const, address: _address }
}

export function loadGetterTupleMaybeAddress(source: TupleReader) {
  const _address = source.readAddressOpt()
  return { $$type: "MaybeAddress" as const, address: _address }
}

export function storeTupleMaybeAddress(source: MaybeAddress) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.address)
  return builder.build()
}

export function dictValueParserMaybeAddress(): DictionaryValue<MaybeAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeMaybeAddress(src)).endCell())
    },
    parse: (src) => {
      return loadMaybeAddress(src.loadRef().beginParse())
    },
  }
}

export type JettonUpdateContent = {
  $$type: "JettonUpdateContent"
  queryId: bigint
  content: Cell
}

export function storeJettonUpdateContent(src: JettonUpdateContent) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(4, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeRef(src.content)
  }
}

export function loadJettonUpdateContent(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 4) {
    throw new Error("Invalid prefix")
  }
  const _queryId = sc_0.loadUintBig(64)
  const _content = sc_0.loadRef()
  return { $$type: "JettonUpdateContent" as const, queryId: _queryId, content: _content }
}

export function loadTupleJettonUpdateContent(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _content = source.readCell()
  return { $$type: "JettonUpdateContent" as const, queryId: _queryId, content: _content }
}

export function loadGetterTupleJettonUpdateContent(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _content = source.readCell()
  return { $$type: "JettonUpdateContent" as const, queryId: _queryId, content: _content }
}

export function storeTupleJettonUpdateContent(source: JettonUpdateContent) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeCell(source.content)
  return builder.build()
}

export function dictValueParserJettonUpdateContent(): DictionaryValue<JettonUpdateContent> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonUpdateContent(src)).endCell())
    },
    parse: (src) => {
      return loadJettonUpdateContent(src.loadRef().beginParse())
    },
  }
}

export type JettonTransfer = {
  $$type: "JettonTransfer"
  queryId: bigint
  amount: bigint
  destination: Address
  responseDestination: Address | null
  customPayload: Cell | null
  forwardTonAmount: bigint
  forwardPayload: Slice
}

export function storeJettonTransfer(src: JettonTransfer) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(260734629, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeCoins(src.amount)
    b_0.storeAddress(src.destination)
    b_0.storeAddress(src.responseDestination)
    if (src.customPayload !== null && src.customPayload !== undefined) {
      b_0.storeBit(true).storeRef(src.customPayload)
    } else {
      b_0.storeBit(false)
    }
    b_0.storeCoins(src.forwardTonAmount)
    b_0.storeBuilder(src.forwardPayload.asBuilder())
  }
}

export function loadJettonTransfer(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 260734629) {
    throw new Error("Invalid prefix")
  }
  const _queryId = sc_0.loadUintBig(64)
  const _amount = sc_0.loadCoins()
  const _destination = sc_0.loadAddress()
  const _responseDestination = sc_0.loadMaybeAddress()
  const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null
  const _forwardTonAmount = sc_0.loadCoins()
  const _forwardPayload = sc_0
  return { $$type: "JettonTransfer" as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload }
}

export function loadTupleJettonTransfer(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _destination = source.readAddress()
  const _responseDestination = source.readAddressOpt()
  const _customPayload = source.readCellOpt()
  const _forwardTonAmount = source.readBigNumber()
  const _forwardPayload = source.readCell().asSlice()
  return { $$type: "JettonTransfer" as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload }
}

export function loadGetterTupleJettonTransfer(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _destination = source.readAddress()
  const _responseDestination = source.readAddressOpt()
  const _customPayload = source.readCellOpt()
  const _forwardTonAmount = source.readBigNumber()
  const _forwardPayload = source.readCell().asSlice()
  return { $$type: "JettonTransfer" as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload }
}

export function storeTupleJettonTransfer(source: JettonTransfer) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeNumber(source.amount)
  builder.writeAddress(source.destination)
  builder.writeAddress(source.responseDestination)
  builder.writeCell(source.customPayload)
  builder.writeNumber(source.forwardTonAmount)
  builder.writeSlice(source.forwardPayload.asCell())
  return builder.build()
}

export function dictValueParserJettonTransfer(): DictionaryValue<JettonTransfer> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonTransfer(src)).endCell())
    },
    parse: (src) => {
      return loadJettonTransfer(src.loadRef().beginParse())
    },
  }
}

export type JettonTransferInternal = {
  $$type: "JettonTransferInternal"
  queryId: bigint
  amount: bigint
  sender: Address
  responseDestination: Address | null
  forwardTonAmount: bigint
  forwardPayload: Slice
}

export function storeJettonTransferInternal(src: JettonTransferInternal) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(395134233, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeCoins(src.amount)
    b_0.storeAddress(src.sender)
    b_0.storeAddress(src.responseDestination)
    b_0.storeCoins(src.forwardTonAmount)
    b_0.storeBuilder(src.forwardPayload.asBuilder())
  }
}

export function loadJettonTransferInternal(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 395134233) {
    throw new Error("Invalid prefix")
  }
  const _queryId = sc_0.loadUintBig(64)
  const _amount = sc_0.loadCoins()
  const _sender = sc_0.loadAddress()
  const _responseDestination = sc_0.loadMaybeAddress()
  const _forwardTonAmount = sc_0.loadCoins()
  const _forwardPayload = sc_0
  return { $$type: "JettonTransferInternal" as const, queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload }
}

export function loadTupleJettonTransferInternal(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _responseDestination = source.readAddressOpt()
  const _forwardTonAmount = source.readBigNumber()
  const _forwardPayload = source.readCell().asSlice()
  return { $$type: "JettonTransferInternal" as const, queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload }
}

export function loadGetterTupleJettonTransferInternal(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _responseDestination = source.readAddressOpt()
  const _forwardTonAmount = source.readBigNumber()
  const _forwardPayload = source.readCell().asSlice()
  return { $$type: "JettonTransferInternal" as const, queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload }
}

export function storeTupleJettonTransferInternal(source: JettonTransferInternal) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeNumber(source.amount)
  builder.writeAddress(source.sender)
  builder.writeAddress(source.responseDestination)
  builder.writeNumber(source.forwardTonAmount)
  builder.writeSlice(source.forwardPayload.asCell())
  return builder.build()
}

export function dictValueParserJettonTransferInternal(): DictionaryValue<JettonTransferInternal> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonTransferInternal(src)).endCell())
    },
    parse: (src) => {
      return loadJettonTransferInternal(src.loadRef().beginParse())
    },
  }
}

export type JettonNotification = {
  $$type: "JettonNotification"
  queryId: bigint
  amount: bigint
  sender: Address
  forwardPayload: Slice
}

export function storeJettonNotification(src: JettonNotification) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(1935855772, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeCoins(src.amount)
    b_0.storeAddress(src.sender)
    b_0.storeBuilder(src.forwardPayload.asBuilder())
  }
}

export function loadJettonNotification(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 1935855772) {
    throw new Error("Invalid prefix")
  }
  const _queryId = sc_0.loadUintBig(64)
  const _amount = sc_0.loadCoins()
  const _sender = sc_0.loadAddress()
  const _forwardPayload = sc_0
  return { $$type: "JettonNotification" as const, queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload }
}

export function loadTupleJettonNotification(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _forwardPayload = source.readCell().asSlice()
  return { $$type: "JettonNotification" as const, queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload }
}

export function loadGetterTupleJettonNotification(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _forwardPayload = source.readCell().asSlice()
  return { $$type: "JettonNotification" as const, queryId: _queryId, amount: _amount, sender: _sender, forwardPayload: _forwardPayload }
}

export function storeTupleJettonNotification(source: JettonNotification) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeNumber(source.amount)
  builder.writeAddress(source.sender)
  builder.writeSlice(source.forwardPayload.asCell())
  return builder.build()
}

export function dictValueParserJettonNotification(): DictionaryValue<JettonNotification> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonNotification(src)).endCell())
    },
    parse: (src) => {
      return loadJettonNotification(src.loadRef().beginParse())
    },
  }
}

export type JettonBurn = {
  $$type: "JettonBurn"
  queryId: bigint
  amount: bigint
  responseDestination: Address | null
  customPayload: Cell | null
}

export function storeJettonBurn(src: JettonBurn) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(1499400124, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeCoins(src.amount)
    b_0.storeAddress(src.responseDestination)
    if (src.customPayload !== null && src.customPayload !== undefined) {
      b_0.storeBit(true).storeRef(src.customPayload)
    } else {
      b_0.storeBit(false)
    }
  }
}

export function loadJettonBurn(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 1499400124) {
    throw new Error("Invalid prefix")
  }
  const _queryId = sc_0.loadUintBig(64)
  const _amount = sc_0.loadCoins()
  const _responseDestination = sc_0.loadMaybeAddress()
  const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null
  return { $$type: "JettonBurn" as const, queryId: _queryId, amount: _amount, responseDestination: _responseDestination, customPayload: _customPayload }
}

export function loadTupleJettonBurn(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _responseDestination = source.readAddressOpt()
  const _customPayload = source.readCellOpt()
  return { $$type: "JettonBurn" as const, queryId: _queryId, amount: _amount, responseDestination: _responseDestination, customPayload: _customPayload }
}

export function loadGetterTupleJettonBurn(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _responseDestination = source.readAddressOpt()
  const _customPayload = source.readCellOpt()
  return { $$type: "JettonBurn" as const, queryId: _queryId, amount: _amount, responseDestination: _responseDestination, customPayload: _customPayload }
}

export function storeTupleJettonBurn(source: JettonBurn) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeNumber(source.amount)
  builder.writeAddress(source.responseDestination)
  builder.writeCell(source.customPayload)
  return builder.build()
}

export function dictValueParserJettonBurn(): DictionaryValue<JettonBurn> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonBurn(src)).endCell())
    },
    parse: (src) => {
      return loadJettonBurn(src.loadRef().beginParse())
    },
  }
}

export type JettonBurnNotification = {
  $$type: "JettonBurnNotification"
  queryId: bigint
  amount: bigint
  sender: Address
  responseDestination: Address | null
}

export function storeJettonBurnNotification(src: JettonBurnNotification) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(2078119902, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeCoins(src.amount)
    b_0.storeAddress(src.sender)
    b_0.storeAddress(src.responseDestination)
  }
}

export function loadJettonBurnNotification(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 2078119902) {
    throw new Error("Invalid prefix")
  }
  const _queryId = sc_0.loadUintBig(64)
  const _amount = sc_0.loadCoins()
  const _sender = sc_0.loadAddress()
  const _responseDestination = sc_0.loadMaybeAddress()
  return { $$type: "JettonBurnNotification" as const, queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination }
}

export function loadTupleJettonBurnNotification(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _responseDestination = source.readAddressOpt()
  return { $$type: "JettonBurnNotification" as const, queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination }
}

export function loadGetterTupleJettonBurnNotification(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _responseDestination = source.readAddressOpt()
  return { $$type: "JettonBurnNotification" as const, queryId: _queryId, amount: _amount, sender: _sender, responseDestination: _responseDestination }
}

export function storeTupleJettonBurnNotification(source: JettonBurnNotification) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeNumber(source.amount)
  builder.writeAddress(source.sender)
  builder.writeAddress(source.responseDestination)
  return builder.build()
}

export function dictValueParserJettonBurnNotification(): DictionaryValue<JettonBurnNotification> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonBurnNotification(src)).endCell())
    },
    parse: (src) => {
      return loadJettonBurnNotification(src.loadRef().beginParse())
    },
  }
}

export type JettonExcesses = {
  $$type: "JettonExcesses"
  queryId: bigint
}

export function storeJettonExcesses(src: JettonExcesses) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(3576854235, 32)
    b_0.storeUint(src.queryId, 64)
  }
}

export function loadJettonExcesses(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 3576854235) {
    throw new Error("Invalid prefix")
  }
  const _queryId = sc_0.loadUintBig(64)
  return { $$type: "JettonExcesses" as const, queryId: _queryId }
}

export function loadTupleJettonExcesses(source: TupleReader) {
  const _queryId = source.readBigNumber()
  return { $$type: "JettonExcesses" as const, queryId: _queryId }
}

export function loadGetterTupleJettonExcesses(source: TupleReader) {
  const _queryId = source.readBigNumber()
  return { $$type: "JettonExcesses" as const, queryId: _queryId }
}

export function storeTupleJettonExcesses(source: JettonExcesses) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  return builder.build()
}

export function dictValueParserJettonExcesses(): DictionaryValue<JettonExcesses> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonExcesses(src)).endCell())
    },
    parse: (src) => {
      return loadJettonExcesses(src.loadRef().beginParse())
    },
  }
}

export type ProvideWalletAddress = {
  $$type: "ProvideWalletAddress"
  queryId: bigint
  ownerAddress: Address
  includeAddress: boolean
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(745978227, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeAddress(src.ownerAddress)
    b_0.storeBit(src.includeAddress)
  }
}

export function loadProvideWalletAddress(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 745978227) {
    throw new Error("Invalid prefix")
  }
  const _queryId = sc_0.loadUintBig(64)
  const _ownerAddress = sc_0.loadAddress()
  const _includeAddress = sc_0.loadBit()
  return { $$type: "ProvideWalletAddress" as const, queryId: _queryId, ownerAddress: _ownerAddress, includeAddress: _includeAddress }
}

export function loadTupleProvideWalletAddress(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _ownerAddress = source.readAddress()
  const _includeAddress = source.readBoolean()
  return { $$type: "ProvideWalletAddress" as const, queryId: _queryId, ownerAddress: _ownerAddress, includeAddress: _includeAddress }
}

export function loadGetterTupleProvideWalletAddress(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _ownerAddress = source.readAddress()
  const _includeAddress = source.readBoolean()
  return { $$type: "ProvideWalletAddress" as const, queryId: _queryId, ownerAddress: _ownerAddress, includeAddress: _includeAddress }
}

export function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeAddress(source.ownerAddress)
  builder.writeBoolean(source.includeAddress)
  return builder.build()
}

export function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeProvideWalletAddress(src)).endCell())
    },
    parse: (src) => {
      return loadProvideWalletAddress(src.loadRef().beginParse())
    },
  }
}

export type TakeWalletAddress = {
  $$type: "TakeWalletAddress"
  queryId: bigint
  walletAddress: Address
  ownerAddress: Cell | null
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(3513996288, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeAddress(src.walletAddress)
    if (src.ownerAddress !== null && src.ownerAddress !== undefined) {
      b_0.storeBit(true).storeRef(src.ownerAddress)
    } else {
      b_0.storeBit(false)
    }
  }
}

export function loadTakeWalletAddress(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 3513996288) {
    throw new Error("Invalid prefix")
  }
  const _queryId = sc_0.loadUintBig(64)
  const _walletAddress = sc_0.loadAddress()
  const _ownerAddress = sc_0.loadBit() ? sc_0.loadRef() : null
  return { $$type: "TakeWalletAddress" as const, queryId: _queryId, walletAddress: _walletAddress, ownerAddress: _ownerAddress }
}

export function loadTupleTakeWalletAddress(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _walletAddress = source.readAddress()
  const _ownerAddress = source.readCellOpt()
  return { $$type: "TakeWalletAddress" as const, queryId: _queryId, walletAddress: _walletAddress, ownerAddress: _ownerAddress }
}

export function loadGetterTupleTakeWalletAddress(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _walletAddress = source.readAddress()
  const _ownerAddress = source.readCellOpt()
  return { $$type: "TakeWalletAddress" as const, queryId: _queryId, walletAddress: _walletAddress, ownerAddress: _ownerAddress }
}

export function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeAddress(source.walletAddress)
  builder.writeCell(source.ownerAddress)
  return builder.build()
}

export function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeTakeWalletAddress(src)).endCell())
    },
    parse: (src) => {
      return loadTakeWalletAddress(src.loadRef().beginParse())
    },
  }
}

export type Mint = {
  $$type: "Mint"
  queryId: bigint
  receiver: Address
  tonAmount: bigint
  mintMessage: JettonTransferInternal
}

export function storeMint(src: Mint) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(21, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeAddress(src.receiver)
    b_0.storeCoins(src.tonAmount)
    const b_1 = new Builder()
    b_1.store(storeJettonTransferInternal(src.mintMessage))
    b_0.storeRef(b_1.endCell())
  }
}

export function loadMint(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 21) {
    throw new Error("Invalid prefix")
  }
  const _queryId = sc_0.loadUintBig(64)
  const _receiver = sc_0.loadAddress()
  const _tonAmount = sc_0.loadCoins()
  const sc_1 = sc_0.loadRef().beginParse()
  const _mintMessage = loadJettonTransferInternal(sc_1)
  return { $$type: "Mint" as const, queryId: _queryId, receiver: _receiver, tonAmount: _tonAmount, mintMessage: _mintMessage }
}

export function loadTupleMint(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _receiver = source.readAddress()
  const _tonAmount = source.readBigNumber()
  const _mintMessage = loadTupleJettonTransferInternal(source)
  return { $$type: "Mint" as const, queryId: _queryId, receiver: _receiver, tonAmount: _tonAmount, mintMessage: _mintMessage }
}

export function loadGetterTupleMint(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _receiver = source.readAddress()
  const _tonAmount = source.readBigNumber()
  const _mintMessage = loadGetterTupleJettonTransferInternal(source)
  return { $$type: "Mint" as const, queryId: _queryId, receiver: _receiver, tonAmount: _tonAmount, mintMessage: _mintMessage }
}

export function storeTupleMint(source: Mint) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeAddress(source.receiver)
  builder.writeNumber(source.tonAmount)
  builder.writeTuple(storeTupleJettonTransferInternal(source.mintMessage))
  return builder.build()
}

export function dictValueParserMint(): DictionaryValue<Mint> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeMint(src)).endCell())
    },
    parse: (src) => {
      return loadMint(src.loadRef().beginParse())
    },
  }
}

export type CloseMinting = {
  $$type: "CloseMinting"
}

export function storeCloseMinting(src: CloseMinting) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(22, 32)
  }
}

export function loadCloseMinting(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 22) {
    throw new Error("Invalid prefix")
  }
  return { $$type: "CloseMinting" as const }
}

export function loadTupleCloseMinting(source: TupleReader) {
  return { $$type: "CloseMinting" as const }
}

export function loadGetterTupleCloseMinting(source: TupleReader) {
  return { $$type: "CloseMinting" as const }
}

export function storeTupleCloseMinting(source: CloseMinting) {
  const builder = new TupleBuilder()
  return builder.build()
}

export function dictValueParserCloseMinting(): DictionaryValue<CloseMinting> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeCloseMinting(src)).endCell())
    },
    parse: (src) => {
      return loadCloseMinting(src.loadRef().beginParse())
    },
  }
}

export type ChangeOwner = {
  $$type: "ChangeOwner"
  queryId: bigint
  newOwner: Address
}

export function storeChangeOwner(src: ChangeOwner) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(3, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeAddress(src.newOwner)
  }
}

export function loadChangeOwner(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 3) {
    throw new Error("Invalid prefix")
  }
  const _queryId = sc_0.loadUintBig(64)
  const _newOwner = sc_0.loadAddress()
  return { $$type: "ChangeOwner" as const, queryId: _queryId, newOwner: _newOwner }
}

export function loadTupleChangeOwner(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _newOwner = source.readAddress()
  return { $$type: "ChangeOwner" as const, queryId: _queryId, newOwner: _newOwner }
}

export function loadGetterTupleChangeOwner(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _newOwner = source.readAddress()
  return { $$type: "ChangeOwner" as const, queryId: _queryId, newOwner: _newOwner }
}

export function storeTupleChangeOwner(source: ChangeOwner) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeAddress(source.newOwner)
  return builder.build()
}

export function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell())
    },
    parse: (src) => {
      return loadChangeOwner(src.loadRef().beginParse())
    },
  }
}

export type ProvideWalletBalance = {
  $$type: "ProvideWalletBalance"
  receiver: Address
  includeVerifyInfo: boolean
}

export function storeProvideWalletBalance(src: ProvideWalletBalance) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(2059982169, 32)
    b_0.storeAddress(src.receiver)
    b_0.storeBit(src.includeVerifyInfo)
  }
}

export function loadProvideWalletBalance(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 2059982169) {
    throw new Error("Invalid prefix")
  }
  const _receiver = sc_0.loadAddress()
  const _includeVerifyInfo = sc_0.loadBit()
  return { $$type: "ProvideWalletBalance" as const, receiver: _receiver, includeVerifyInfo: _includeVerifyInfo }
}

export function loadTupleProvideWalletBalance(source: TupleReader) {
  const _receiver = source.readAddress()
  const _includeVerifyInfo = source.readBoolean()
  return { $$type: "ProvideWalletBalance" as const, receiver: _receiver, includeVerifyInfo: _includeVerifyInfo }
}

export function loadGetterTupleProvideWalletBalance(source: TupleReader) {
  const _receiver = source.readAddress()
  const _includeVerifyInfo = source.readBoolean()
  return { $$type: "ProvideWalletBalance" as const, receiver: _receiver, includeVerifyInfo: _includeVerifyInfo }
}

export function storeTupleProvideWalletBalance(source: ProvideWalletBalance) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.receiver)
  builder.writeBoolean(source.includeVerifyInfo)
  return builder.build()
}

export function dictValueParserProvideWalletBalance(): DictionaryValue<ProvideWalletBalance> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeProvideWalletBalance(src)).endCell())
    },
    parse: (src) => {
      return loadProvideWalletBalance(src.loadRef().beginParse())
    },
  }
}

export type VerifyInfo = {
  $$type: "VerifyInfo"
  owner: Address
  minter: Address
  code: Cell
}

export function storeVerifyInfo(src: VerifyInfo) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeAddress(src.owner)
    b_0.storeAddress(src.minter)
    b_0.storeRef(src.code)
  }
}

export function loadVerifyInfo(slice: Slice) {
  const sc_0 = slice
  const _owner = sc_0.loadAddress()
  const _minter = sc_0.loadAddress()
  const _code = sc_0.loadRef()
  return { $$type: "VerifyInfo" as const, owner: _owner, minter: _minter, code: _code }
}

export function loadTupleVerifyInfo(source: TupleReader) {
  const _owner = source.readAddress()
  const _minter = source.readAddress()
  const _code = source.readCell()
  return { $$type: "VerifyInfo" as const, owner: _owner, minter: _minter, code: _code }
}

export function loadGetterTupleVerifyInfo(source: TupleReader) {
  const _owner = source.readAddress()
  const _minter = source.readAddress()
  const _code = source.readCell()
  return { $$type: "VerifyInfo" as const, owner: _owner, minter: _minter, code: _code }
}

export function storeTupleVerifyInfo(source: VerifyInfo) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.owner)
  builder.writeAddress(source.minter)
  builder.writeCell(source.code)
  return builder.build()
}

export function dictValueParserVerifyInfo(): DictionaryValue<VerifyInfo> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeVerifyInfo(src)).endCell())
    },
    parse: (src) => {
      return loadVerifyInfo(src.loadRef().beginParse())
    },
  }
}

export type TakeWalletBalance = {
  $$type: "TakeWalletBalance"
  balance: bigint
  verifyInfo: VerifyInfo | null
}

export function storeTakeWalletBalance(src: TakeWalletBalance) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(3396861378, 32)
    b_0.storeCoins(src.balance)
    if (src.verifyInfo !== null && src.verifyInfo !== undefined) {
      b_0.storeBit(true); b_0.store(storeVerifyInfo(src.verifyInfo))
    } else {
      b_0.storeBit(false)
    }
  }
}

export function loadTakeWalletBalance(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 3396861378) {
    throw new Error("Invalid prefix")
  }
  const _balance = sc_0.loadCoins()
  const _verifyInfo = sc_0.loadBit() ? loadVerifyInfo(sc_0) : null
  return { $$type: "TakeWalletBalance" as const, balance: _balance, verifyInfo: _verifyInfo }
}

export function loadTupleTakeWalletBalance(source: TupleReader) {
  const _balance = source.readBigNumber()
  const _verifyInfo_p = source.readTupleOpt()
  const _verifyInfo = _verifyInfo_p ? loadTupleVerifyInfo(_verifyInfo_p) : null
  return { $$type: "TakeWalletBalance" as const, balance: _balance, verifyInfo: _verifyInfo }
}

export function loadGetterTupleTakeWalletBalance(source: TupleReader) {
  const _balance = source.readBigNumber()
  const _verifyInfo_p = source.readTupleOpt()
  const _verifyInfo = _verifyInfo_p ? loadTupleVerifyInfo(_verifyInfo_p) : null
  return { $$type: "TakeWalletBalance" as const, balance: _balance, verifyInfo: _verifyInfo }
}

export function storeTupleTakeWalletBalance(source: TakeWalletBalance) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.balance)
  if (source.verifyInfo !== null && source.verifyInfo !== undefined) {
    builder.writeTuple(storeTupleVerifyInfo(source.verifyInfo))
  } else {
    builder.writeTuple(null)
  }
  return builder.build()
}

export function dictValueParserTakeWalletBalance(): DictionaryValue<TakeWalletBalance> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeTakeWalletBalance(src)).endCell())
    },
    parse: (src) => {
      return loadTakeWalletBalance(src.loadRef().beginParse())
    },
  }
}

export type ClaimTON = {
  $$type: "ClaimTON"
  receiver: Address
}

export function storeClaimTON(src: ClaimTON) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(60010958, 32)
    b_0.storeAddress(src.receiver)
  }
}

export function loadClaimTON(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 60010958) {
    throw new Error("Invalid prefix")
  }
  const _receiver = sc_0.loadAddress()
  return { $$type: "ClaimTON" as const, receiver: _receiver }
}

export function loadTupleClaimTON(source: TupleReader) {
  const _receiver = source.readAddress()
  return { $$type: "ClaimTON" as const, receiver: _receiver }
}

export function loadGetterTupleClaimTON(source: TupleReader) {
  const _receiver = source.readAddress()
  return { $$type: "ClaimTON" as const, receiver: _receiver }
}

export function storeTupleClaimTON(source: ClaimTON) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.receiver)
  return builder.build()
}

export function dictValueParserClaimTON(): DictionaryValue<ClaimTON> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeClaimTON(src)).endCell())
    },
    parse: (src) => {
      return loadClaimTON(src.loadRef().beginParse())
    },
  }
}

export type BondingCurve$Data = {
  $$type: "BondingCurve$Data"
  tokenReserve: bigint
  tonReserve: bigint
  minter: Address
}

export function storeBondingCurve$Data(src: BondingCurve$Data) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeCoins(src.tokenReserve)
    b_0.storeCoins(src.tonReserve)
    b_0.storeAddress(src.minter)
  }
}

export function loadBondingCurve$Data(slice: Slice) {
  const sc_0 = slice
  const _tokenReserve = sc_0.loadCoins()
  const _tonReserve = sc_0.loadCoins()
  const _minter = sc_0.loadAddress()
  return { $$type: "BondingCurve$Data" as const, tokenReserve: _tokenReserve, tonReserve: _tonReserve, minter: _minter }
}

export function loadTupleBondingCurve$Data(source: TupleReader) {
  const _tokenReserve = source.readBigNumber()
  const _tonReserve = source.readBigNumber()
  const _minter = source.readAddress()
  return { $$type: "BondingCurve$Data" as const, tokenReserve: _tokenReserve, tonReserve: _tonReserve, minter: _minter }
}

export function loadGetterTupleBondingCurve$Data(source: TupleReader) {
  const _tokenReserve = source.readBigNumber()
  const _tonReserve = source.readBigNumber()
  const _minter = source.readAddress()
  return { $$type: "BondingCurve$Data" as const, tokenReserve: _tokenReserve, tonReserve: _tonReserve, minter: _minter }
}

export function storeTupleBondingCurve$Data(source: BondingCurve$Data) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.tokenReserve)
  builder.writeNumber(source.tonReserve)
  builder.writeAddress(source.minter)
  return builder.build()
}

export function dictValueParserBondingCurve$Data(): DictionaryValue<BondingCurve$Data> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeBondingCurve$Data(src)).endCell())
    },
    parse: (src) => {
      return loadBondingCurve$Data(src.loadRef().beginParse())
    },
  }
}

type BondingCurve_init_args = {
  $$type: "BondingCurve_init_args"
  tokenReserve: bigint
  tonReserve: bigint
  minter: Address
}

function initBondingCurve_init_args(src: BondingCurve_init_args) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeCoins(src.tokenReserve)
    b_0.storeCoins(src.tonReserve)
    b_0.storeAddress(src.minter)
  }
}

async function BondingCurve_init(tokenReserve: bigint, tonReserve: bigint, minter: Address) {
  const __code = Cell.fromHex("b5ee9c7241022001000747000228ff008e88f4a413f4bcf2c80bed5320e303ed43d9010502037c7802040127b544fda89a1f401f401f480aa40d827b678d8630030002210127b4c89da89a1f401f401f480aa40d827b678d86300d02f83001d072d721d200d200fa4021103450666f04f86102f862ed44d0fa00fa00fa4055206c13048e33028020d7217021d749c21f9430d31f01de82100f8a7ea5ba8e16d33ffa00596c21a002c855205afa0258fa02cec9ed54e05f04e07023d74920c21f953103d31f04de218210b7994897bae3022182107362d09cba060802fc5b02fa00305312a8f8416f24135f038126f2a8812710a90414a05133a9045122a1208200f7c403be12f2f420503470f82822db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d070804021f842f8286d230cc801821049f0f84158cb1f01fa02c9d01046090700b6105b103441301cc8556082100f8a7ea55008cb1f16cb3f5004fa0212ce01206e9430cf84809201cee2f40001fa02cec946301540037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb0002c855205afa0258fa02cec9ed5403f08f675b02d33f31fa00fa40820092a1f842456770f82822db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d018c70516f2f403d20001985b6c12a0f8276f10e30e58c855205afa0258fa02cec9ed54e035335bc00001c121b0e302f2c082091e1f011688c855215afa0212cecec90a0228ff008e88f4a413f4bcf2c80bed5320e303ed43d90b1002037c580c0e0127b6d81da89a1f401f481f480aa40d827b678d86300d0002220127b7605da89a1f401f481f480aa40d827b678d86900f000ef82a546330523001f83001d072d721d200d200fa4021103450666f04f86102f862ed44d0fa00fa40fa4055206c13048e53028020d7217021d749c21f9430d31f01de208210178d4519ba8e1630d33ffa00596c21a002c855205afa0212cecec9ed54e082107bdd97deba8e15d33ffa00596c21a002c855205afa0212cecec9ed54e05f04e011045a02d70d1ff2e0822182100f8a7ea5bae302218210178d4519bae3022182107ac8d559bae302218210595f07bcba12151a1b01fe31d33ffa00fa40d72c01916d93fa4001e201f40431fa0023fa4430f2d08a8123fff84229c705f2f45164a181093e21c2fff2f4820092b827d749c200f2f4f8416f2425b8a4541432817d7106fa40fa0071d721fa00fa00306c6170f83a12a85240a081290470f836aa008208989680a0a0bcf2f450547080407f2a4613509a1302f4c855508210178d45195007cb1f15cb3f5003fa02ce01206e9430cf84809201cee201fa02cec9525328db3c10561024103610261045102410235f41f90001f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f9040003c8cf8580ca0012cccccf884008cbff01fa028069cf40cf8634f400c901fb000216140018c855205afa0212cecec9ed5404fc31d33ffa00fa40d72c01916d93fa4001e201fa005164a0705349db3cf842fa44315920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400206ef2d08001ba9b8123fff84252a0c705f2f4dff8416f2421f8276f1021a127c200963c1059385f06e30d048208989680b60972fb02236eb39170e30d161718190018f82ac855215afa0212cecec900ae5531fa40fa0071d721fa00fa00306c6170f83a5240a012a17170294913508bc8553082107362d09c5005cb1f13cb3f01fa02cecec9290447135066441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb004140000620c20000988e3803206ef2d0808100827004c8018210d53276db58cb1fcb3fc91024103512441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0093135f03e202c855205afa0212cecec9ed5400c231fa40d200306d019930f82a4430126f0358923333e201c8598210ca77fdc25003cb1f01fa02216eb38e117f01ca0001206ef2d0806f235023cececc947032ca00e2c90170804043137fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb000190e3023431820b93b1ceba8e3701fa40308123fff8425003c70512f2f482089896808010fb027083066d40037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00e05bf2c0821c01fc31d33ffa00d72c01916d93fa4001e2318123fff84226c705f2f45131a181093e21c2fff2f4f8416f2443305230fa40fa0071d721fa00fa00306c6170f83a813cf6811a2c70f836aa0012a012bcf2f47080405414367f07c8553082107bdd97de5005cb1f13cb3f01fa02ce01206e9430cf84809201cee2c92604431350551d004e441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0002c855205afa0212cecec9ed540088028126f2a8812710a90402fa00305334a85043a15122a9045205a1208200f7c405be14f2f45880406d40037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00010030820898968070fb02f842c8cf8508ce70cf0b6ec98042fb006ea2fcad")
  const builder = beginCell()
  initBondingCurve_init_args({ $$type: "BondingCurve_init_args", tokenReserve, tonReserve, minter })(builder)
  const __data = builder.endCell()
  return { code: __code, data: __data }
}

export const BondingCurve_errors = {
  2: { message: "Stack underflow" },
  3: { message: "Stack overflow" },
  4: { message: "Integer overflow" },
  5: { message: "Integer out of expected range" },
  6: { message: "Invalid opcode" },
  7: { message: "Type check error" },
  8: { message: "Cell overflow" },
  9: { message: "Cell underflow" },
  10: { message: "Dictionary error" },
  11: { message: "'Unknown' error" },
  12: { message: "Fatal error" },
  13: { message: "Out of gas error" },
  14: { message: "Virtualization error" },
  32: { message: "Action list is invalid" },
  33: { message: "Action list is too long" },
  34: { message: "Action is invalid or not supported" },
  35: { message: "Invalid source address in outbound message" },
  36: { message: "Invalid destination address in outbound message" },
  37: { message: "Not enough Toncoin" },
  38: { message: "Not enough extra currencies" },
  39: { message: "Outbound message does not fit into a cell after rewriting" },
  40: { message: "Cannot process a message" },
  41: { message: "Library reference is null" },
  42: { message: "Library change action error" },
  43: { message: "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree" },
  50: { message: "Account state size exceeded limits" },
  128: { message: "Null reference exception" },
  129: { message: "Invalid serialization prefix" },
  130: { message: "Invalid incoming message" },
  131: { message: "Constraints error" },
  132: { message: "Access denied" },
  133: { message: "Contract stopped" },
  134: { message: "Invalid argument" },
  135: { message: "Code of a contract was not found" },
  136: { message: "Invalid standard address" },
  138: { message: "Not a basechain address" },
  2366: { message: "Incorrect balance after send" },
  9215: { message: "Incorrect sender" },
  15606: { message: "Unsufficient amount of TON attached" },
  32113: { message: "Insufficient amount of TON attached" },
  37537: { message: "Only JettonWallet can notify" },
  37560: { message: "Invalid forward payload" },
  63428: { message: "Slippage" },
} as const

export const BondingCurve_errors_backward = {
  "Stack underflow": 2,
  "Stack overflow": 3,
  "Integer overflow": 4,
  "Integer out of expected range": 5,
  "Invalid opcode": 6,
  "Type check error": 7,
  "Cell overflow": 8,
  "Cell underflow": 9,
  "Dictionary error": 10,
  "'Unknown' error": 11,
  "Fatal error": 12,
  "Out of gas error": 13,
  "Virtualization error": 14,
  "Action list is invalid": 32,
  "Action list is too long": 33,
  "Action is invalid or not supported": 34,
  "Invalid source address in outbound message": 35,
  "Invalid destination address in outbound message": 36,
  "Not enough Toncoin": 37,
  "Not enough extra currencies": 38,
  "Outbound message does not fit into a cell after rewriting": 39,
  "Cannot process a message": 40,
  "Library reference is null": 41,
  "Library change action error": 42,
  "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
  "Account state size exceeded limits": 50,
  "Null reference exception": 128,
  "Invalid serialization prefix": 129,
  "Invalid incoming message": 130,
  "Constraints error": 131,
  "Access denied": 132,
  "Contract stopped": 133,
  "Invalid argument": 134,
  "Code of a contract was not found": 135,
  "Invalid standard address": 136,
  "Not a basechain address": 138,
  "Incorrect balance after send": 2366,
  "Incorrect sender": 9215,
  "Unsufficient amount of TON attached": 15606,
  "Insufficient amount of TON attached": 32113,
  "Only JettonWallet can notify": 37537,
  "Invalid forward payload": 37560,
  "Slippage": 63428,
} as const

const BondingCurve_types: ABIType[] = [
  { name: "DataSize", header: null, fields: [{ name: "cells", type: { kind: "simple", type: "int", optional: false, format: 257 } }, { name: "bits", type: { kind: "simple", type: "int", optional: false, format: 257 } }, { name: "refs", type: { kind: "simple", type: "int", optional: false, format: 257 } }] },
  { name: "SignedBundle", header: null, fields: [{ name: "signature", type: { kind: "simple", type: "fixed-bytes", optional: false, format: 64 } }, { name: "signedData", type: { kind: "simple", type: "slice", optional: false, format: "remainder" } }] },
  { name: "StateInit", header: null, fields: [{ name: "code", type: { kind: "simple", type: "cell", optional: false } }, { name: "data", type: { kind: "simple", type: "cell", optional: false } }] },
  { name: "Context", header: null, fields: [{ name: "bounceable", type: { kind: "simple", type: "bool", optional: false } }, { name: "sender", type: { kind: "simple", type: "address", optional: false } }, { name: "value", type: { kind: "simple", type: "int", optional: false, format: 257 } }, { name: "raw", type: { kind: "simple", type: "slice", optional: false } }] },
  { name: "SendParameters", header: null, fields: [{ name: "mode", type: { kind: "simple", type: "int", optional: false, format: 257 } }, { name: "body", type: { kind: "simple", type: "cell", optional: true } }, { name: "code", type: { kind: "simple", type: "cell", optional: true } }, { name: "data", type: { kind: "simple", type: "cell", optional: true } }, { name: "value", type: { kind: "simple", type: "int", optional: false, format: 257 } }, { name: "to", type: { kind: "simple", type: "address", optional: false } }, { name: "bounce", type: { kind: "simple", type: "bool", optional: false } }] },
  { name: "MessageParameters", header: null, fields: [{ name: "mode", type: { kind: "simple", type: "int", optional: false, format: 257 } }, { name: "body", type: { kind: "simple", type: "cell", optional: true } }, { name: "value", type: { kind: "simple", type: "int", optional: false, format: 257 } }, { name: "to", type: { kind: "simple", type: "address", optional: false } }, { name: "bounce", type: { kind: "simple", type: "bool", optional: false } }] },
  { name: "DeployParameters", header: null, fields: [{ name: "mode", type: { kind: "simple", type: "int", optional: false, format: 257 } }, { name: "body", type: { kind: "simple", type: "cell", optional: true } }, { name: "value", type: { kind: "simple", type: "int", optional: false, format: 257 } }, { name: "bounce", type: { kind: "simple", type: "bool", optional: false } }, { name: "init", type: { kind: "simple", type: "StateInit", optional: false } }] },
  { name: "StdAddress", header: null, fields: [{ name: "workchain", type: { kind: "simple", type: "int", optional: false, format: 8 } }, { name: "address", type: { kind: "simple", type: "uint", optional: false, format: 256 } }] },
  { name: "VarAddress", header: null, fields: [{ name: "workchain", type: { kind: "simple", type: "int", optional: false, format: 32 } }, { name: "address", type: { kind: "simple", type: "slice", optional: false } }] },
  { name: "BasechainAddress", header: null, fields: [{ name: "hash", type: { kind: "simple", type: "int", optional: true, format: 257 } }] },
  { name: "Buy", header: 3080276119, fields: [{ name: "minTokensOut", type: { kind: "simple", type: "uint", optional: false, format: "coins" } }] },
  { name: "Sell", header: 2259500909, fields: [{ name: "tokenIn", type: { kind: "simple", type: "uint", optional: false, format: "coins" } }, { name: "minTonOut", type: { kind: "simple", type: "uint", optional: false, format: "coins" } }] },
  { name: "BuyNotification", header: 1240528961, fields: [{ name: "amount", type: { kind: "simple", type: "uint", optional: false, format: "coins" } }] },
  { name: "JettonWallet$Data", header: null, fields: [{ name: "balance", type: { kind: "simple", type: "uint", optional: false, format: "coins" } }, { name: "owner", type: { kind: "simple", type: "address", optional: false } }, { name: "minter", type: { kind: "simple", type: "address", optional: false } }] },
  { name: "JettonData", header: null, fields: [{ name: "totalSupply", type: { kind: "simple", type: "int", optional: false, format: 257 } }, { name: "mintable", type: { kind: "simple", type: "bool", optional: false } }, { name: "owner", type: { kind: "simple", type: "address", optional: false } }, { name: "content", type: { kind: "simple", type: "cell", optional: false } }, { name: "jettonWalletCode", type: { kind: "simple", type: "cell", optional: false } }] },
  { name: "JettonWalletData", header: null, fields: [{ name: "balance", type: { kind: "simple", type: "int", optional: false, format: 257 } }, { name: "owner", type: { kind: "simple", type: "address", optional: false } }, { name: "minter", type: { kind: "simple", type: "address", optional: false } }, { name: "code", type: { kind: "simple", type: "cell", optional: false } }] },
  { name: "MaybeAddress", header: null, fields: [{ name: "address", type: { kind: "simple", type: "address", optional: true } }] },
  { name: "JettonUpdateContent", header: 4, fields: [{ name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } }, { name: "content", type: { kind: "simple", type: "cell", optional: false } }] },
  { name: "JettonTransfer", header: 260734629, fields: [{ name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } }, { name: "amount", type: { kind: "simple", type: "uint", optional: false, format: "coins" } }, { name: "destination", type: { kind: "simple", type: "address", optional: false } }, { name: "responseDestination", type: { kind: "simple", type: "address", optional: true } }, { name: "customPayload", type: { kind: "simple", type: "cell", optional: true } }, { name: "forwardTonAmount", type: { kind: "simple", type: "uint", optional: false, format: "coins" } }, { name: "forwardPayload", type: { kind: "simple", type: "slice", optional: false, format: "remainder" } }] },
  { name: "JettonTransferInternal", header: 395134233, fields: [{ name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } }, { name: "amount", type: { kind: "simple", type: "uint", optional: false, format: "coins" } }, { name: "sender", type: { kind: "simple", type: "address", optional: false } }, { name: "responseDestination", type: { kind: "simple", type: "address", optional: true } }, { name: "forwardTonAmount", type: { kind: "simple", type: "uint", optional: false, format: "coins" } }, { name: "forwardPayload", type: { kind: "simple", type: "slice", optional: false, format: "remainder" } }] },
  { name: "JettonNotification", header: 1935855772, fields: [{ name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } }, { name: "amount", type: { kind: "simple", type: "uint", optional: false, format: "coins" } }, { name: "sender", type: { kind: "simple", type: "address", optional: false } }, { name: "forwardPayload", type: { kind: "simple", type: "slice", optional: false, format: "remainder" } }] },
  { name: "JettonBurn", header: 1499400124, fields: [{ name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } }, { name: "amount", type: { kind: "simple", type: "uint", optional: false, format: "coins" } }, { name: "responseDestination", type: { kind: "simple", type: "address", optional: true } }, { name: "customPayload", type: { kind: "simple", type: "cell", optional: true } }] },
  { name: "JettonBurnNotification", header: 2078119902, fields: [{ name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } }, { name: "amount", type: { kind: "simple", type: "uint", optional: false, format: "coins" } }, { name: "sender", type: { kind: "simple", type: "address", optional: false } }, { name: "responseDestination", type: { kind: "simple", type: "address", optional: true } }] },
  { name: "JettonExcesses", header: 3576854235, fields: [{ name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } }] },
  { name: "ProvideWalletAddress", header: 745978227, fields: [{ name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } }, { name: "ownerAddress", type: { kind: "simple", type: "address", optional: false } }, { name: "includeAddress", type: { kind: "simple", type: "bool", optional: false } }] },
  { name: "TakeWalletAddress", header: 3513996288, fields: [{ name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } }, { name: "walletAddress", type: { kind: "simple", type: "address", optional: false } }, { name: "ownerAddress", type: { kind: "simple", type: "cell", optional: true } }] },
  { name: "Mint", header: 21, fields: [{ name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } }, { name: "receiver", type: { kind: "simple", type: "address", optional: false } }, { name: "tonAmount", type: { kind: "simple", type: "uint", optional: false, format: "coins" } }, { name: "mintMessage", type: { kind: "simple", type: "JettonTransferInternal", optional: false } }] },
  { name: "CloseMinting", header: 22, fields: [] },
  { name: "ChangeOwner", header: 3, fields: [{ name: "queryId", type: { kind: "simple", type: "uint", optional: false, format: 64 } }, { name: "newOwner", type: { kind: "simple", type: "address", optional: false } }] },
  { name: "ProvideWalletBalance", header: 2059982169, fields: [{ name: "receiver", type: { kind: "simple", type: "address", optional: false } }, { name: "includeVerifyInfo", type: { kind: "simple", type: "bool", optional: false } }] },
  { name: "VerifyInfo", header: null, fields: [{ name: "owner", type: { kind: "simple", type: "address", optional: false } }, { name: "minter", type: { kind: "simple", type: "address", optional: false } }, { name: "code", type: { kind: "simple", type: "cell", optional: false } }] },
  { name: "TakeWalletBalance", header: 3396861378, fields: [{ name: "balance", type: { kind: "simple", type: "uint", optional: false, format: "coins" } }, { name: "verifyInfo", type: { kind: "simple", type: "VerifyInfo", optional: true } }] },
  { name: "ClaimTON", header: 60010958, fields: [{ name: "receiver", type: { kind: "simple", type: "address", optional: false } }] },
  { name: "BondingCurve$Data", header: null, fields: [{ name: "tokenReserve", type: { kind: "simple", type: "uint", optional: false, format: "coins" } }, { name: "tonReserve", type: { kind: "simple", type: "uint", optional: false, format: "coins" } }, { name: "minter", type: { kind: "simple", type: "address", optional: false } }] },
]

const BondingCurve_opcodes = {
  Buy: 3080276119,
  Sell: 2259500909,
  BuyNotification: 1240528961,
  JettonUpdateContent: 4,
  JettonTransfer: 260734629,
  JettonTransferInternal: 395134233,
  JettonNotification: 1935855772,
  JettonBurn: 1499400124,
  JettonBurnNotification: 2078119902,
  JettonExcesses: 3576854235,
  ProvideWalletAddress: 745978227,
  TakeWalletAddress: 3513996288,
  Mint: 21,
  CloseMinting: 22,
  ChangeOwner: 3,
  ProvideWalletBalance: 2059982169,
  TakeWalletBalance: 3396861378,
  ClaimTON: 60010958,
}

const BondingCurve_getters: ABIGetter[] = [
  { name: "get_token_reserve", methodId: 124484, arguments: [], returnType: { kind: "simple", type: "int", optional: false, format: 257 } },
  { name: "get_ton_reserve", methodId: 117287, arguments: [], returnType: { kind: "simple", type: "int", optional: false, format: 257 } },
]

export const BondingCurve_getterMapping: { [key: string]: string } = {
  get_token_reserve: "getGetTokenReserve",
  get_ton_reserve: "getGetTonReserve",
}

const BondingCurve_receivers: ABIReceiver[] = [
  { receiver: "internal", message: { kind: "empty" } },
  { receiver: "internal", message: { kind: "typed", type: "Buy" } },
  { receiver: "internal", message: { kind: "typed", type: "JettonNotification" } },
]

export const FEE_BPS = 30n
export const TakeWalletAddressOpcode = 3513996288n
export const gasForBurn = 6700n
export const gasForTransfer = 10500n
export const minTonsForStorage = 10000000n
export const Basechain = 0n

export class BondingCurve implements Contract {
  public static readonly storageReserve = 0n
  public static readonly errors = BondingCurve_errors_backward
  public static readonly opcodes = BondingCurve_opcodes

  static async init(tokenReserve: bigint, tonReserve: bigint, minter: Address) {
    return await BondingCurve_init(tokenReserve, tonReserve, minter)
  }

  static async fromInit(tokenReserve: bigint, tonReserve: bigint, minter: Address) {
    const __gen_init = await BondingCurve_init(tokenReserve, tonReserve, minter)
    const address = contractAddress(0, __gen_init)
    return new BondingCurve(address, __gen_init)
  }

  static fromAddress(address: Address) {
    return new BondingCurve(address)
  }

  readonly address: Address
  readonly init?: { code: Cell, data: Cell }
  readonly abi: ContractABI = {
    types: BondingCurve_types,
    getters: BondingCurve_getters,
    receivers: BondingCurve_receivers,
    errors: BondingCurve_errors,
  }

  constructor(address: Address, init?: { code: Cell, data: Cell }) {
    this.address = address
    this.init = init
  }

  async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean | null | undefined }, message: null | Buy | JettonNotification) {
    let body: Cell | null = null
    if (message === null) {
      body = new Cell()
    }
    if (message && typeof message === "object" && !(message instanceof Slice) && message.$$type === "Buy") {
      body = beginCell().store(storeBuy(message)).endCell()
    }
    if (message && typeof message === "object" && !(message instanceof Slice) && message.$$type === "JettonNotification") {
      body = beginCell().store(storeJettonNotification(message)).endCell()
    }
    if (body === null) {
      throw new Error("Invalid message type")
    }

    await provider.internal(via, { ...args, body })
  }

  async getGetTokenReserve(provider: ContractProvider) {
    const builder = new TupleBuilder()
    const source = (await provider.get("get_token_reserve", builder.build())).stack
    const result = source.readBigNumber()
    return result
  }

  async getGetTonReserve(provider: ContractProvider) {
    const builder = new TupleBuilder()
    const source = (await provider.get("get_ton_reserve", builder.build())).stack
    const result = source.readBigNumber()
    return result
  }
}
