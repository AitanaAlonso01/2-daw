import React, { useRef, useEffect } from 'react'
import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-responsive'
import language from 'datatables.net-plugins/i18n/es-ES.mjs'

const DataTable = ({ datos = [], columnas = [] }) => {
  const tableRef = useRef()

  const initDataTable = () => {
    const $el = $(tableRef.current)

    // CORRECCIÓN: Usar 'isDataTable' para verificar si ya existe
    if ($.fn.dataTable.isDataTable($el)) {
      $el.DataTable().destroy()
    }

    $el.DataTable({
      responsive: true,
      stateSave: false,
      language: language,
    })
  }

  useEffect(() => {
    // Primero dejamos que React renderice los datos en el DOM, luego inicializamos DataTables sobre ese HTML.
    initDataTable()

    // LIMPIEZA: Retornamos la función de destrucción
    return () => {
      const $el = $(tableRef.current)
      if ($.fn.dataTable.isDataTable($el)) {
        $el.DataTable().destroy(true)
      }
    }
  }, [datos]) // Se vuelve a ejecutar si los datos cambian

  return (
    <div>
      <table className="dataTable" ref={tableRef}>
        <thead>
          <tr>
            {columnas.map(col => (
              <th key={col.key}>{col.encabezado}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map(elem => (
            <tr key={elem._id}>
              {columnas.map(col => (
                <td key={col.key}>{elem[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
