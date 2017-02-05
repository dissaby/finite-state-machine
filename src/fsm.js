class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config != null) {
            this.currentState = config.initial;
            this.states = config.states;
            this.configInitial = config.initial;
            this.statesHistory = [];
            this.nextState = null;
        } else {
            throw new Error("Config is undefined");
        }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (state in this.states) {
            this.statesHistory.push(this.currentState);
            this.currentState = state;
        } else {
            throw new Error("State isn\'t exist)");
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (event in this.states[this.currentState].transitions) {
            this.statesHistory.push(this.currentState);
            this.currentState = this.states[this.currentState].transitions[event];
        } else {
            throw new Error("Invalid event");
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState = this.configInitial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var array = [];
        if (event == null) {
            for (var state in this.states) {
                array.push(state);
            }
            return array;
        } else {
            for (var state in this.states) {
                if (this.states[state].transitions[event]) {
                    array.push(state);
                }
            }
            return array;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.statesHistory.length > 0) {
            this.nextState = this.currentState;
            this.currentState = this.statesHistory.pop();
            return true;
        } else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.nextState != 0) {
            this.currentState = this.nextState;
        } else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.statesHistory = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
