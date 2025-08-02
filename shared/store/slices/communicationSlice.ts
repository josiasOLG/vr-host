import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface MFEMessage {
  id: string
  from: string
  to?: string 
  type: string
  payload: unknown
  timestamp: number
}

export interface MFEEvent {
  type: string
  payload: unknown
  source: string
}

interface CommunicationState {
  messages: MFEMessage[]
  events: MFEEvent[]
  sharedData: Record<string, unknown>
  connectedMFEs: string[]
}

const initialState: CommunicationState = {
  messages: [],
  events: [],
  sharedData: {},
  connectedMFEs: [],
}

const communicationSlice = createSlice({
  name: 'communication',
  initialState,
  reducers: {
    registerMFE: (state, action: PayloadAction<string>) => {
      if (!state.connectedMFEs.includes(action.payload)) {
        state.connectedMFEs.push(action.payload)
      }
    },

    unregisterMFE: (state, action: PayloadAction<string>) => {
      state.connectedMFEs = state.connectedMFEs.filter(mfe => mfe !== action.payload)
    },

    sendMessage: (state, action: PayloadAction<Omit<MFEMessage, 'id' | 'timestamp'>>) => {
      const message: MFEMessage = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
      }
      state.messages.push(message)
      
      if (state.messages.length > 100) {
        state.messages = state.messages.slice(-100)
      }
    },

    clearMessages: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload) {
        state.messages = state.messages.filter(
          msg => msg.from !== action.payload && msg.to !== action.payload
        )
      } else {
        state.messages = []
      }
    },

    // Emit event (for broadcasting to all MFEs)
    emitEvent: (state, action: PayloadAction<Omit<MFEEvent, 'source'>>) => {
      state.events.push({
        ...action.payload,
        source: 'host',
      })
      
      // Keep only last 50 events
      if (state.events.length > 50) {
        state.events = state.events.slice(-50)
      }
    },

    // Clear events
    clearEvents: (state) => {
      state.events = []
    },

    // Set shared data that all MFEs can access
    setSharedData: (state, action: PayloadAction<{ key: string; value: unknown }>) => {
      state.sharedData[action.payload.key] = action.payload.value
    },

    // Remove shared data
    removeSharedData: (state, action: PayloadAction<string>) => {
      delete state.sharedData[action.payload]
    },

    // Clear all shared data
    clearSharedData: (state) => {
      state.sharedData = {}
    },
  },
})

export const {
  registerMFE,
  unregisterMFE,
  sendMessage,
  clearMessages,
  emitEvent,
  clearEvents,
  setSharedData,
  removeSharedData,
  clearSharedData,
} = communicationSlice.actions

export default communicationSlice.reducer
