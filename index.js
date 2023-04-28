/**
 * Classe para armazenar e gerenciar o estado de um aplicativo usando o LocalStorage do navegador.
 */
export class Store {
  /**
   * Cria uma instância da classe Store.
   * @param {string} key - A chave usada para identificar o estado do aplicativo no LocalStorage.
   */
  constructor(key) {
    /**
     * A chave usada para identificar o estado do aplicativo no LocalStorage.
     * @private
     * @type {string}
     */
    this._key = key;

    /**
     * O estado atual do aplicativo.
     * @private
     * @type {Object}
     */
    this._state = this._initializeStateFromLocalStorage();

    /**
     * Os listeners registrados para serem notificados quando o estado do aplicativo mudar.
     * @private
     * @type {Array<Function>}
     */
    this._listeners = [];
  }

  /**
   * Salva o estado atual do aplicativo no LocalStorage.
   * @private
   */
  _saveStateToLocalStorage() {
    localStorage.setItem(this._key, JSON.stringify(this._state));
  }

  /**
   * Obtém o estado do aplicativo a partir do LocalStorage, se houver.
   * @private
   * @returns {Object} - O estado atual do aplicativo, ou um objeto vazio se não houver um estado salvo no LocalStorage.
   */
  _initializeStateFromLocalStorage() {
    const savedState = localStorage.getItem(this._key);
    return savedState ? JSON.parse(savedState) : {};
  }

  /**
   * Notifica todos os listeners registrados de que o estado do aplicativo mudou.
   * @private
   */
  _notifyListeners() {
    this._listeners.forEach((listener) => listener());
  }

  /**
   * Define um novo estado para o aplicativo e o salva no LocalStorage.
   * @private
   * @param {Object} newState - O novo estado a ser definido.
   */
  _setState(newState) {
    Object.assign(this._state, newState);
    this._saveStateToLocalStorage();
    this._notifyListeners();
  }

  /**
   * Adiciona uma nova propriedade ao estado do aplicativo e a salva no LocalStorage.
   * @param {string} name - O nome da nova propriedade a ser adicionada.
   * @param {*} value - O valor da nova propriedade a ser adicionada.
   */
  addProperty(name, value) {
    if (!this._state.hasOwnProperty(name)) {
      this._state[name] = value;
      this._saveStateToLocalStorage();
      this._notifyListeners();
    }
  }

  /**
   * Atualiza o valor de uma propriedade existente no estado do aplicativo e o salva no LocalStorage.
   * @param {string} name - O nome da propriedade a ser atualizada.
   * @param {*} value - O novo valor da propriedade a ser atualizada.
   */
  updateProperty(name, value) {
    if (this._state.hasOwnProperty(name)) {
      this._state[name] = value;
      this._saveStateToLocalStorage();
      this._notifyListeners();
    }
  }

  /**
   * Remove uma propriedade existente do estado do aplicativo e o salva no LocalStorage.
   * @param {string} name - O nome da propriedade a ser removida.
   */
  removeProperty(name) {
    if (this._state.hasOwnProperty(name)) {
      delete this._state[name];
      this._saveStateToLocalStorage();
      this._notifyListeners();
    }
  }

  /**
   * Registra uma nova função de callback para ser notificada sempre que o estado for atualizado.
   *
   * @param {function} listener - A função de callback a ser registrada.
   */
  subscribe(listener) {
    this._listeners.push(listener);
  }

  /**
   * Remove uma função de callback previamente registrada para não ser mais notificada quando o estado for atualizado.
   * @param {function} callback - A função de callback a ser removida.
   */
  unsubscribe(callback) {
    this._listeners = this._listeners.filter(
      (listener) => listener !== callback
    );
  }

  /**
   * Retorna o estado atual da store.
   *@returns {object} - O estado atual da store.
   */
  get state() {
    return this._state;
  }

  /**
   *Retorna a lista de todas as funções de callback registradas na store.
   *@returns {array} - A lista de todas as funções de callback registradas na store.
   */
  get listeners() {
    return this._listeners;
  }
}
