const EnterpriceTab = () => (
  <>
    <View style={styles.container} >
      <View style={styles.header}>
        <Text style={styles.headerTitleText}>EQUIPAMENTOS</Text>
      </View>
      <ScrollView style={styles.main}>
        <View
          style={styles.mainButton}
        >
          <View style={styles.mainButtonItem}>
            {equipamentoData.map((equipamentoData, i) => (
              <Text key={equipamentoData.idmaterial} style={i % 2 !== 0 ? styles.mainButtonItemText : styles.mainButtonItemTextPar}>{equipamentoData.descricaomaterial}</Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  </>
);
export { EnterpriceTab }