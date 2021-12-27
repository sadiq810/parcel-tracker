import React, {useEffect} from "react";
import {getStatsAction} from "../redux/actions";
import {connect} from "react-redux";

function Dashboard({token, getStats, stats}) {
    useEffect(() => {
        getStats({token});
    }, [])

    return (
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            <div className="d-flex flex-column-fluid">
                <div className="container">
                    <div className="card card-custom gutter-b">
                        <div className="card-header border-0 pt-7">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label font-weight-bold font-size-h4 text-dark-75">Your parcels statistics</span>
                                <span className="text-muted mt-3 font-weight-bold font-size-sm">Overall overview</span>
                            </h3>
                        </div>

                        <div className="card-body pt-0 pb-4">
                            <div className="tab-content mt-2" id="myTabTable5">
                                <div className="tab-pane fade show active" id="kt_tab_table_5_3" role="tabpanel" aria-labelledby="kt_tab_table_5_3">
                                    <div className="table-responsive">
                                        <table className="table table-borderless table-vertical-center">
                                            <thead>
                                            <tr>
                                                <th className="p-0 min-w-200px" >Total Parcels: {stats.total}</th>
                                                <th className="p-0 min-w-100px" >Un Delivered: {stats.undelivered}</th>
                                                <th className="p-0 min-w-125px" >Delivered: {stats.delivered}</th>
                                                <th className="p-0 min-w-110px" >Available: {stats.available}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr style={{borderTop: '1px solid #eaeaea', borderBottom: '1px solid #eaeaea'}}>
                                                <th colSpan={5} className={'text-muted'}>Most Recent Parcels</th>
                                            </tr>
                                            <tr>
                                                <th className="pl-0 ml-n3">
                                                    Parcel
                                                </th>
                                                <th className="text-right">
                                                    From Location
                                                </th>
                                                <th className="text-right">
                                                    To Location
                                                </th>
                                                <th className="text-right">
                                                    Status
                                                </th>
                                            </tr>
                                            {stats.latest && stats.latest.length > 0 &&
                                                stats.latest.map(parcel => (
                                                    <tr key={parcel.id}>
                                                        <td className="pl-0 ml-n3">
                                                            {parcel.title}
                                                        </td>
                                                        <td className="text-right">
                                                            {parcel.pickup_address}
                                                        </td>
                                                        <td className="text-right">
                                                            {parcel.dropoff_address}
                                                        </td>
                                                        <td className="text-right">
                                                            {parcel.biker_id === null &&
                                                            <span className="label label-lg label-light-info label-inline">Available</span>
                                                            }
                                                            {parcel.biker_id !== null && parcel.is_delivered === false &&
                                                            <span className="label label-lg label-light-success label-inline">Picked up</span>
                                                            }
                                                            {parcel.biker_id !== null && parcel.is_delivered === true &&
                                                            <span className="label label-lg label-light-warning label-inline">Delivered</span>
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                    {/*end::Tablet*/}
                                </div>
                                {/*end::Tap pane*/}
                            </div>
                        </div>
                        {/*end::Body*/}
                    </div>

                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    getStats: (payload) => dispatch(getStatsAction(payload)),
})

const mapStateToProps = (state) => ({
    token: state.users.token,
    stats: state.parcels.stats
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
